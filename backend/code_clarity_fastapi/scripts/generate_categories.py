#!/usr/bin/env python3
"""
Script to generate categories.json by parsing question files.
Follows PEP8 standards and provides clear documentation.
"""

import json
import os
from pathlib import Path
from typing import Dict, List, Set
import re


def read_question_metadata(file_path: Path) -> dict:
    """
    Extract category metadata from a question markdown file.
    Handles markdown-style metadata format with headers and lists.
    
    Args:
        file_path: Path to the markdown file
        
    Returns:
        dict: Dictionary containing category and subcategory if found
    """
    metadata = {"category": "", "subcategory": ""}
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
            # Look for Category and Subcategory in markdown list items
            category_match = re.search(r'\*\*Category\*\*:\s*([^\n]+)', content)
            subcategory_match = re.search(r'\*\*Subcategory\*\*:\s*([^\n]+)', content)
            
            if category_match:
                metadata["category"] = category_match.group(1).strip()
            if subcategory_match:
                metadata["subcategory"] = subcategory_match.group(1).strip()
            
            print(f"\nProcessing {file_path}")
            print(f"Found Category: {metadata['category']}")
            print(f"Found Subcategory: {metadata['subcategory']}")
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
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
    
    # Walk through all markdown files in questions directory
    for file_path in questions_dir.rglob('*.md'):
        metadata = read_question_metadata(file_path)
        category = metadata.get('category')
        subcategory = metadata.get('subcategory') or 'Uncategorized'
        
        if category:
            if category not in categories:
                categories[category] = set()
            categories[category].add(subcategory)
    
    # Convert sets to sorted lists for JSON serialization
    result = {
        category: sorted(list(subcategories))
        for category, subcategories in categories.items()
    }
    
    print("\nExtracted categories:", result)
    return result


def main():
    """Main function to generate categories.json file."""
    # Get repository root (2 levels up from the script location)
    repo_root = Path(__file__).resolve().parent.parent.parent.parent
    
    # Setup paths relative to repository root
    questions_dir = repo_root / 'frontend' / 'public' / 'static' / 'data' / 'questions'
    output_dir = repo_root / 'frontend' / 'public' / 'static' / 'data'
    
    print(f"\nRepository root: {repo_root}")
    print(f"Questions directory: {questions_dir}")
    print(f"Output directory: {output_dir}")
    
    try:
        # Create output directory if it doesn't exist
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Extract categories and subcategories
        categories_dict = extract_categories(questions_dir)
        
        # Save to JSON file
        output_file = output_dir / 'categories.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(categories_dict, f, indent=2)
        
        print(f"\nCategories successfully saved to {output_file}")
        print("Categories found:", list(categories_dict.keys()))
        
    except Exception as e:
        print(f"Error generating categories: {e}")
        raise


if __name__ == '__main__':
    main()