#!/bin/bash

# Philosophical and Multidisciplinary Commit Message Generator
echo "🧠 Perfect Commit Composer (Ontology, Epistemology, Engineering, Biology, Common Sense)"
echo "Answer a few questions to generate a maximally meaningful commit message."

read -p "🧱 Entity/Concept being changed (e.g. AuthFlow, NotificationService): " entity
read -p "🔧 Action/Verb (e.g. Refactor, Introduce, Clarify, Abolish): " action
read -p "🔍 What was clarified or understood better? " understanding
read -p "🔨 What structural or behavioral change occurred? " change
read -p "🌟 What value or principle does it serve (e.g. modularity, clarity, security)? " value
read -p "📝 Optional body (what else would help others understand the commit): " body
read -p "🔗 Optional footer (e.g. Refs: #42): " footer

# Compose the message
subject_line="$action $entity: $understanding, $change, $value"

echo ""
echo "🔖 Generated Commit Message:"
echo "---------------------------------------"
echo "$subject_line"
if [[ -n "$body" ]]; then
  echo ""
  echo "$body"
fi
if [[ -n "$footer" ]]; then
  echo ""
  echo "$footer"
fi
echo "---------------------------------------"

read -p "✅ Use this as your commit message? (y/n): " confirm

if [[ "$confirm" == "y" ]]; then
  full_message="$subject_line"
  [[ -n "$body" ]] && full_message+="\n\n$body"
  [[ -n "$footer" ]] && full_message+="\n\n$footer"

  echo -e "$full_message" | git commit -F -
  echo "✅ Commit complete."
else
  echo "❌ Commit cancelled."
fi
