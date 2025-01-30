#!/usr/bin/env python3
"""
Script to generate categories.json by parsing question files.
Follows PEP8 standards and provides clear documentation.
"""

import json
import os
from pathlib import Path
from typing import Dict, List, Set


def read_question_metadata(file_path: Path) -> dict:
    """
    Extract category metadata from a question markdown file.
    
    Args:
        file_path: Path to the markdown file
        
    Returns:
        dict: Dictionary containing category and subcategory if found
    """
    metadata = {"category": "", "subcategory": ""}
    
    print(f"\nProcessing file: {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            print(f"File content preview: {content[:200]}...")  # Print first 200 chars
            
            parts = content.split('---')
            print(f"Number of parts after splitting by '---': {len(parts)}")
            
            if len(parts) >= 3:  # Valid frontmatter
                frontmatter = parts[1].strip()
                print(f"Frontmatter found: \n{frontmatter}")
                
                for line in frontmatter.split('\n'):
                    if ':' in line:
                        key, value = line.split(':', 1)
                        key = key.strip().lower()
                        value = value.strip().strip('"\'')
                        if key in metadata:
                            metadata[key] = value
                            print(f"Found metadata - {key}: {value}")
            else:
                print("No valid frontmatter found (not enough '---' separators)")
                
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    print(f"Final metadata for file: {metadata}")
    return metadata


def extract_categories(questions_dir: Path) -> Dict[str, List[str]]:
    """
    Walk through questions directory and extract all categories and subcategories.
    
    Args:
        questions_dir: Path to questions directory
        
    Returns:
        Dict mapping categories to lists of subcategories
    """
    categories: Dict[str, Set[str]] = {}
    
    if not questions_dir.exists():
        raise FileNotFoundError(f"Questions directory not found: {questions_dir}")
    
    print(f"\nScanning directory: {questions_dir}")
    print("Directory contents:")
    for item in questions_dir.rglob('*'):
        print(f"Found: {item}")
    
    # Walk through all markdown files in questions directory
    md_files = list(questions_dir.rglob('*.md'))
    print(f"\nFound {len(md_files)} markdown files")
    
    for file_path in md_files:
        metadata = read_question_metadata(file_path)
        category = metadata.get('category')
        subcategory = metadata.get('subcategory') or 'Uncategorized'
        
        print(f"\nProcessing metadata from {file_path}")
        print(f"Category: {category}")
        print(f"Subcategory: {subcategory}")
        
        if category:
            if category not in categories:
                categories[category] = set()
            categories[category].add(subcategory)
            print(f"Added to categories dict. Current state for {category}: {categories[category]}")
    
    # Convert sets to sorted lists for JSON serialization
    result = {
        category: sorted(list(subcategories))
        for category, subcategories in categories.items()
    }
    
    print("\nFinal categories dictionary:")
    print(json.dumps(result, indent=2))
    
    return result


def main():
    """Main function to generate categories.json file."""
    # Get repository root (2 levels up from the script location)
    repo_root = Path(__file__).resolve().parent.parent.parent.parent
    
    # Setup paths relative to repository root
    questions_dir = repo_root / 'frontend' / 'public' / 'static' / 'data' / 'questions'
    output_dir = repo_root / 'frontend' / 'public' / 'static' / 'data'
    
    print("\n=== Starting Category Generation ===")
    print(f"Repository root: {repo_root}")
    print(f"Questions directory: {questions_dir}")
    print(f"Output directory: {output_dir}")
    
    try:
        # Create output directory if it doesn't exist
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Verify questions directory exists and show contents
        if questions_dir.exists():
            print("\nListing contents of questions directory:")
            for item in questions_dir.iterdir():
                print(f"- {item}")
        else:
            print(f"\nWARNING: Questions directory not found at {questions_dir}")
            print("Current directory contents:")
            for item in repo_root.iterdir():
                print(f"- {item}")
        
        # Extract categories and subcategories
        categories_dict = extract_categories(questions_dir)
        
        # Save to JSON file
        output_file = output_dir / 'categories.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(categories_dict, f, indent=2)
        
        print(f"\nCategories successfully extracted and saved to {output_file}")
        print("Categories found:", list(categories_dict.keys()))
        
        # Verify the output
        print("\nVerifying output file:")
        if output_file.exists():
            with open(output_file, 'r') as f:
                content = f.read()
                print(f"Output file content: {content}")
        else:
            print("WARNING: Output file was not created!")
        
    except Exception as e:
        print(f"\nError generating categories: {e}")
        raise


if __name__ == '__main__':
    main()