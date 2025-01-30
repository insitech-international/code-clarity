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

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read().split('---')
            if len(content) >= 3:  # Valid frontmatter
                frontmatter = content[1].strip()
                for line in frontmatter.split('\n'):
                    if ':' in line:
                        key, value = line.split(':', 1)
                        key = key.strip().lower()
                        value = value.strip().strip('"\'')
                        if key in metadata:
                            metadata[key] = value
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
    return {
        category: sorted(list(subcategories))
        for category, subcategories in categories.items()
    }


def main():
    """Main function to generate categories.json file."""
    # Setup paths
    script_dir = Path(__file__).parent
    questions_dir = script_dir / 'code_clarity_fastapi' / 'data' / 'question_bank'
    output_dir = script_dir / 'frontend' / 'public' / 'static' / 'data'

    try:
        # Create output directory if it doesn't exist
        output_dir.mkdir(parents=True, exist_ok=True)

        # Extract categories and subcategories
        categories_dict = extract_categories(questions_dir)

        # Save to JSON file
        output_file = output_dir / 'categories.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(categories_dict, f, indent=2)

        print(f"Categories successfully extracted and saved to {output_file}")
        print("Categories found:", list(categories_dict.keys()))

    except Exception as e:
        print(f"Error generating categories: {e}")
        raise


if __name__ == '__main__':
    main()