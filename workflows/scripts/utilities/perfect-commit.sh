#!/bin/bash

# ============================================================================
# REVOLUTIONARY COMMIT FRAMEWORK SYSTEM (RCFS)
# A Complete Philosophical, Scientific, and Engineering Approach to Git Commits
# ============================================================================

# set -euo pipefail

# Configuration and Constants
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly CONFIG_FILE="$HOME/.rcfs_config"
readonly HISTORY_FILE="$HOME/.rcfs_history"
readonly TEMPLATES_DIR="$HOME/.rcfs_templates"
readonly VERSION="2.0.0"

# Color codes for enhanced UX
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly BLUE='\033[0;34m'
readonly YELLOW='\033[1;33m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly WHITE='\033[1;37m'
readonly NC='\033[0m' # No Color

# Unicode symbols for visual hierarchy
readonly BRAIN="🧠"
readonly GEAR="⚙️"
readonly DNA="🧬"
readonly ATOM="⚛️"
readonly TELESCOPE="🔭"
readonly MICROSCOPE="🔬"
readonly LIGHTBULB="💡"
readonly TARGET="🎯"
readonly DIAMOND="💎"
readonly INFINITY="∞"

# ============================================================================
# CORE FRAMEWORK DIMENSIONS
# ============================================================================

# Ontological Categories (What exists in the codebase)
declare -A ONTOLOGICAL_ENTITIES=(
  ["architecture"]="System Architecture, Design Patterns, Infrastructure"
  ["data"]="Data Models, Schemas, Structures, Flow"
  ["behavior"]="Business Logic, Algorithms, Workflows"
  ["interface"]="APIs, UI Components, Contracts"
  ["security"]="Authentication, Authorization, Encryption"
  ["performance"]="Optimization, Caching, Resource Management"
  ["reliability"]="Error Handling, Testing, Monitoring"
  ["documentation"]="Comments, READMEs, Specifications"
  ["tooling"]="Build Systems, CI/CD, Development Tools"
  ["environment"]="Configuration, Deployment, Infrastructure"
)

# Epistemological Actions (How we know/learn/change)
declare -A EPISTEMOLOGICAL_ACTIONS=(
    ["discover"]="Uncover hidden patterns, reveal implicit assumptions"
    ["clarify"]="Make explicit what was implicit, improve understanding"
    ["synthesize"]="Combine disparate elements into coherent whole"
    ["abstract"]="Extract essential patterns, generalize concepts"
    ["specialize"]="Adapt general patterns to specific contexts"
    ["validate"]="Confirm hypotheses through testing/observation"
    ["refute"]="Disprove assumptions, reject invalid approaches"
    ["optimize"]="Improve efficiency based on empirical evidence"
    ["systematize"]="Organize knowledge into coherent frameworks"
    ["question"]="Challenge existing assumptions, explore alternatives"
)

# Teleological Purposes (Why - ultimate aims and values)
declare -A TELEOLOGICAL_VALUES=(
    ["excellence"]="Pursuit of highest quality and craftsmanship"
    ["clarity"]="Maximum comprehensibility and transparency"
    ["elegance"]="Simplicity that reveals essential beauty"
    ["robustness"]="Resilience against failure and change"
    ["scalability"]="Sustainable growth and adaptation"
    ["security"]="Protection of data and system integrity"
    ["efficiency"]="Optimal resource utilization"
    ["maintainability"]="Long-term sustainability and evolution"
    ["usability"]="Human-centered design and experience"
    ["innovation"]="Creative problem-solving and advancement"
)

# Complexity Classifications
declare -A COMPLEXITY_LEVELS=(
    ["trivial"]="Simple, obvious changes with minimal impact"
    ["moderate"]="Standard changes requiring some analysis"
    ["significant"]="Complex changes affecting multiple systems"
    ["architectural"]="Fundamental changes to system structure"
    ["paradigmatic"]="Revolutionary changes to approach/philosophy"
)

# Impact Scopes
declare -A IMPACT_SCOPES=(
    ["local"]="Single function/method/component"
    ["module"]="Entire module or service"
    ["system"]="Multiple interconnected systems"
    ["ecosystem"]="Entire application ecosystem"
    ["paradigm"]="Fundamental approach or philosophy"
)

# ============================================================================
# INITIALIZATION AND SETUP
# ============================================================================

initialize_framework() {
    echo -e "${PURPLE}${INFINITY} INITIALIZING REVOLUTIONARY COMMIT FRAMEWORK SYSTEM v${VERSION} ${INFINITY}${NC}"
    echo -e "${BLUE}Creating comprehensive knowledge architecture...${NC}"
    
    # Create necessary directories
    mkdir -p "$TEMPLATES_DIR"
    mkdir -p "$(dirname "$CONFIG_FILE")"
    
    # Initialize configuration if it doesn't exist
    if [[ ! -f "$CONFIG_FILE" ]]; then
        cat > "$CONFIG_FILE" << 'EOF'
# RCFS Configuration
DEFAULT_COMPLEXITY=moderate
DEFAULT_SCOPE=module
INCLUDE_PHILOSOPHICAL_CONTEXT=true
INCLUDE_SCIENTIFIC_METHOD=true
INCLUDE_ENGINEERING_PRINCIPLES=true
GENERATE_SEMANTIC_TAGS=true
AUTO_GENERATE_CHANGELOG=true
ENABLE_COMMIT_ANALYTICS=true
MAXIMUM_SUBJECT_LENGTH=72
PREFERRED_COMMIT_STYLE=comprehensive
EOF
    fi
    
    # Initialize history tracking
    if [[ ! -f "$HISTORY_FILE" ]]; then
        echo "# RCFS Commit History - $(date)" > "$HISTORY_FILE"
    fi
    
    load_configuration
}

load_configuration() {
    source "$CONFIG_FILE" 2>/dev/null || true
}

# ============================================================================
# INTERACTIVE KNOWLEDGE ELICITATION SYSTEM
# ============================================================================

display_framework_intro() {
    clear
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                  ${BRAIN} REVOLUTIONARY COMMIT FRAMEWORK SYSTEM ${BRAIN}                  ║${NC}"
    echo -e "${WHITE}║                         Integrating Multiple Disciplines                      ║${NC}"
    echo -e "${WHITE}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${WHITE}║ ${TELESCOPE} PHILOSOPHICAL: Ontology (What) + Epistemology (How) + Teleology (Why) ║${NC}"
    echo -e "${WHITE}║ ${MICROSCOPE} SCIENTIFIC: Hypothesis → Method → Evidence → Conclusion           ║${NC}"
    echo -e "${WHITE}║ ${GEAR} ENGINEERING: Problem → Analysis → Design → Implementation → Test      ║${NC}"
    echo -e "${WHITE}║ ${DNA} BIOLOGICAL: Adaptation → Evolution → Optimization → Emergence         ║${NC}"
    echo -e "${WHITE}║ ${LIGHTBULB} PRAGMATIC: Context → Intent → Action → Outcome → Learning          ║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

elicit_ontological_understanding() {
    echo -e "${PURPLE}${ATOM} ONTOLOGICAL ANALYSIS: What exists in your codebase?${NC}"
    echo -e "${CYAN}Understanding the fundamental entities and their relationships...${NC}"
    echo ""
    
    local i=1
    for entity in "${!ONTOLOGICAL_ENTITIES[@]}"; do
        # echo -e "${BLUE}$i) ${entity^}: ${ONTOLOGICAL_ENTITIES[$entity]}${NC}"
        # Capitalize the first letter manually
        entity_capitalized=$(echo "${entity}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
        echo -e "${BLUE}$i) ${entity_capitalized}: ${ONTOLOGICAL_ENTITIES[$entity]}${NC}"

        ((i++))
    done
    echo ""
    
    read -p "🎯 Primary entity category (name or number): " entity_input
    
    # Handle numeric input
    if [[ "$entity_input" =~ ^[0-9]+$ ]]; then
        local entities=($(printf '%s\n' "${!ONTOLOGICAL_ENTITIES[@]}" | sort))
        if [[ "$entity_input" -ge 1 && "$entity_input" -le "${#entities[@]}" ]]; then
            SELECTED_ENTITY="${entities[$((entity_input-1))]}"
        else
            SELECTED_ENTITY="behavior" # default
        fi
    else
        SELECTED_ENTITY="$entity_input"
    fi
    
    read -p "🔍 Specific component/module name: " COMPONENT_NAME
    read -p "📊 Current state description: " CURRENT_STATE
    read -p "🎯 Desired future state: " FUTURE_STATE
}

elicit_epistemological_understanding() {
    echo -e "${YELLOW}${BRAIN} EPISTEMOLOGICAL ANALYSIS: How do we know and learn?${NC}"
    echo -e "${CYAN}Understanding the process of knowledge acquisition and change...${NC}"
    echo ""
    
    local i=1
    for action in "${!EPISTEMOLOGICAL_ACTIONS[@]}"; do
        # Capitalize the first letter manually
        action_capitalized=$(echo "${action}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
        echo -e "${BLUE}$i) ${action_capitalized}: ${EPISTEMOLOGICAL_ACTIONS[$action]}${NC}"
        ((i++))
    done
    echo ""
    
    read -p "🧠 Primary epistemological action (name or number): " action_input
    
    # Handle numeric input
    if [[ "$action_input" =~ ^[0-9]+$ ]]; then
        local actions=($(printf '%s\n' "${!EPISTEMOLOGICAL_ACTIONS[@]}" | sort))
        if [[ "$action_input" -ge 1 && "$action_input" -le "${#actions[@]}" ]]; then
            SELECTED_ACTION="${actions[$((action_input-1))]}"
        else
            SELECTED_ACTION="clarify" # default
        fi
    else
        SELECTED_ACTION="$action_input"
    fi
    
    read -p "💡 What new understanding emerged?: " NEW_UNDERSTANDING
    read -p "🔬 What evidence supports this change?: " EVIDENCE
    read -p "🧪 What was your methodology?: " METHODOLOGY
}

elicit_teleological_understanding() {
    echo -e "${GREEN}${TARGET} TELEOLOGICAL ANALYSIS: Why does this matter?${NC}"
    echo -e "${CYAN}Understanding the ultimate purpose and values served...${NC}"
    echo ""
    
    local i=1
    for value in "${!TELEOLOGICAL_VALUES[@]}"; do
        value_capitalized=$(echo "${value}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
        echo -e "${BLUE}$i) ${value_capitalized}: ${TELEOLOGICAL_VALUES[$value]}${NC}"
        ((i++))
    done
    echo ""
    
    read -p "🎯 Primary value served (name or number): " value_input
    
    # Handle numeric input
    if [[ "$value_input" =~ ^[0-9]+$ ]]; then
        local values=($(printf '%s\n' "${!TELEOLOGICAL_VALUES[@]}" | sort))
        if [[ "$value_input" -ge 1 && "$value_input" -le "${#values[@]}" ]]; then
            SELECTED_VALUE="${values[$((value_input-1))]}"
        else
            SELECTED_VALUE="excellence" # default
        fi
    else
        SELECTED_VALUE="$value_input"
    fi
    
    read -p "🌟 Long-term vision this serves: " LONG_TERM_VISION
    read -p "⚖️ Trade-offs made and why: " TRADEOFFS
}

elicit_complexity_and_impact() {
    echo -e "${RED}${DIAMOND} COMPLEXITY & IMPACT ANALYSIS${NC}"
    echo -e "${CYAN}Assessing the scope and depth of changes...${NC}"
    echo ""
    
    echo "Complexity Levels:"
    local i=1
    for level in "${!COMPLEXITY_LEVELS[@]}"; do
        level_capitalized=$(echo "${level}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
        echo -e "${BLUE}$i) ${level_capitalized}: ${COMPLEXITY_LEVELS[$level]}${NC}"
        ((i++))
    done
    echo ""
    read -p "📊 Complexity level (name or number): " complexity_input
    
    # Handle complexity input
    if [[ "$complexity_input" =~ ^[0-9]+$ ]]; then
        local levels=($(printf '%s\n' "${!COMPLEXITY_LEVELS[@]}" | sort))
        if [[ "$complexity_input" -ge 1 && "$complexity_input" -le "${#levels[@]}" ]]; then
            SELECTED_COMPLEXITY="${levels[$((complexity_input-1))]}"
        else
            SELECTED_COMPLEXITY="moderate"
        fi
    else
        SELECTED_COMPLEXITY="$complexity_input"
    fi
    
    echo ""
    echo "Impact Scopes:"
    i=1
    for scope in "${!IMPACT_SCOPES[@]}"; do
        scope_capitalized=$(echo "${scope}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
        echo -e "${BLUE}$i) ${scope_capitalized}: ${IMPACT_SCOPES[$scope]}${NC}"
        ((i++))
    done
    echo ""
    read -p "🎯 Impact scope (name or number): " scope_input
    
    # Handle scope input
    if [[ "$scope_input" =~ ^[0-9]+$ ]]; then
        local scopes=($(printf '%s\n' "${!IMPACT_SCOPES[@]}" | sort))
        if [[ "$scope_input" -ge 1 && "$scope_input" -le "${#scopes[@]}" ]]; then
            SELECTED_SCOPE="${scopes[$((scope_input-1))]}"
        else
            SELECTED_SCOPE="module"
        fi
    else
        SELECTED_SCOPE="$scope_input"
    fi
}

elicit_contextual_information() {
    echo -e "${CYAN}${GEAR} CONTEXTUAL & PRAGMATIC INFORMATION${NC}"
    echo ""
    
    read -p "🏗️ Related work items (tickets, issues): " RELATED_WORK
    read -p "👥 Stakeholders affected: " STAKEHOLDERS
    read -p "⚠️ Risk factors and mitigations: " RISKS
    read -p "🔮 Future implications: " FUTURE_IMPLICATIONS
    read -p "📚 Key learnings for the team: " KEY_LEARNINGS
    read -p "🔗 Dependencies created/removed: " DEPENDENCIES
}

# ============================================================================
# ADVANCED COMMIT MESSAGE GENERATION ENGINE
# ============================================================================

generate_semantic_tags() {
    local tags=""
    
    # Generate tags based on selected categories
    [[ -n "$SELECTED_ENTITY" ]] && tags+="entity:${SELECTED_ENTITY} "
    [[ -n "$SELECTED_ACTION" ]] && tags+="action:${SELECTED_ACTION} "
    [[ -n "$SELECTED_VALUE" ]] && tags+="value:${SELECTED_VALUE} "
    [[ -n "$SELECTED_COMPLEXITY" ]] && tags+="complexity:${SELECTED_COMPLEXITY} "
    [[ -n "$SELECTED_SCOPE" ]] && tags+="scope:${SELECTED_SCOPE} "
    
    echo "$tags"
}

generate_philosophical_context() {
    local context=""
    
    if [[ "$INCLUDE_PHILOSOPHICAL_CONTEXT" == "true" ]]; then
        context+="Ontological Transformation: ${CURRENT_STATE} → ${FUTURE_STATE}\n"
        context+="Epistemological Method: ${METHODOLOGY}\n"
        context+="Teleological Purpose: ${LONG_TERM_VISION}\n"
        context+="Evidence Base: ${EVIDENCE}\n"
    fi
    
    echo -e "$context"
}

generate_scientific_methodology() {
    local methodology=""
    
    if [[ "$INCLUDE_SCIENTIFIC_METHOD" == "true" ]]; then
        methodology+="Hypothesis: ${NEW_UNDERSTANDING}\n"
        methodology+="Method: ${METHODOLOGY}\n"
        methodology+="Evidence: ${EVIDENCE}\n"
        methodology+="Conclusion: This change serves ${SELECTED_VALUE} by ${SELECTED_ACTION,,}ing ${SELECTED_ENTITY}\n"
    fi
    
    echo -e "$methodology"
}

generate_engineering_analysis() {
    local analysis=""
    
    if [[ "$INCLUDE_ENGINEERING_PRINCIPLES" == "true" ]]; then
        analysis+="Problem: ${CURRENT_STATE}\n"
        analysis+="Solution: ${FUTURE_STATE}\n"
        analysis+="Trade-offs: ${TRADEOFFS}\n"
        analysis+="Dependencies: ${DEPENDENCIES}\n"
        analysis+="Risk Assessment: ${RISKS}\n"
    fi
    
    echo -e "$analysis"
}

compose_revolutionary_commit() {
    local subject_line=""
    local body=""
    local footer=""
    
    # Generate sophisticated subject line
    
    SELECTED_ACTION_cap=$(echo "${SELECTED_ACTION}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    subject_line="${SELECTED_ACTION_cap} ${SELECTED_ENTITY}: ${COMPONENT_NAME}"
    
    # Add complexity and scope indicators
    SELECTED_COMPLEXITY_CAP=$(echo "${SELECTED_COMPLEXITY}" | tr 'a-z' 'A-Z')
    SELECTED_SCOPE_CAP=$(echo "${SELECTED_SCOPE}" | tr 'a-z' 'A-Z')
    subject_line+=" [${SELECTED_COMPLEXITY_CAP}:${SELECTED_SCOPE_CAP}]"
    
    # Ensure subject line length compliance
    if [[ ${#subject_line} -gt ${MAXIMUM_SUBJECT_LENGTH:-72} ]]; then
        subject_line="${subject_line:0:$((${MAXIMUM_SUBJECT_LENGTH:-72}-3))}..."
    fi
    
    # Compose comprehensive body
    if [[ "$PREFERRED_COMMIT_STYLE" == "comprehensive" ]]; then
        body+="PURPOSE & VISION:\n"
        body+="${LONG_TERM_VISION}\n\n"
        
        body+="TRANSFORMATION:\n"
        body+="From: ${CURRENT_STATE}\n"
        body+="To: ${FUTURE_STATE}\n\n"
        
        body+="KEY INSIGHTS:\n"
        body+="${NEW_UNDERSTANDING}\n\n"
        
        if [[ -n "$KEY_LEARNINGS" ]]; then
            body+="TEAM LEARNINGS:\n"
            body+="${KEY_LEARNINGS}\n\n"
        fi
        
        if [[ -n "$STAKEHOLDERS" ]]; then
            body+="STAKEHOLDER IMPACT:\n"
            body+="${STAKEHOLDERS}\n\n"
        fi
        
        if [[ -n "$FUTURE_IMPLICATIONS" ]]; then
            body+="FUTURE IMPLICATIONS:\n"
            body+="${FUTURE_IMPLICATIONS}\n\n"
        fi
    fi
    
    # Generate semantic tags
    local tags=""
    if [[ "$GENERATE_SEMANTIC_TAGS" == "true" ]]; then
        tags=$(generate_semantic_tags)
    fi
    
    # Compose footer
    if [[ -n "$RELATED_WORK" ]]; then
        footer+="Related: ${RELATED_WORK}\n"
    fi
    
    if [[ -n "$tags" ]]; then
        footer+="Tags: ${tags}\n"
    fi
    
    footer+="Framework: RCFS-v${VERSION}\n"
    footer+="Generated: $(date -Iseconds)"
    
    # Store in global variables for final assembly
    FINAL_SUBJECT="$subject_line"
    FINAL_BODY="$body"
    FINAL_FOOTER="$footer"
}

# ============================================================================
# ADVANCED DISPLAY AND CONFIRMATION SYSTEM
# ============================================================================

display_commit_preview() {
    clear
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                           ${DIAMOND} COMMIT PREVIEW ${DIAMOND}                            ║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    echo -e "${GREEN}SUBJECT:${NC}"
    echo -e "${WHITE}${FINAL_SUBJECT}${NC}"
    echo ""
    
    if [[ -n "$FINAL_BODY" ]]; then
        echo -e "${GREEN}BODY:${NC}"
        echo -e "${CYAN}${FINAL_BODY}${NC}"
    fi
    
    if [[ -n "$FINAL_FOOTER" ]]; then
        echo -e "${GREEN}FOOTER:${NC}"
        echo -e "${YELLOW}${FINAL_FOOTER}${NC}"
    fi
    
    echo ""
    echo -e "${WHITE}═══════════════════════════════════════════════════════════════════════════════${NC}"
}

display_analysis_summary() {
    echo -e "${PURPLE}📊 COMPREHENSIVE ANALYSIS SUMMARY:${NC}"

    SELECTED_ENTITY_CAP=$(echo "${SELECTED_ENTITY}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    SELECTED_ACTION_CAP=$(echo "${SELECTED_ACTION}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    SELECTED_VALUE_CAP=$(echo "${SELECTED_VALUE}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    SELECTED_COMPLEXITY_CAP=$(echo "${SELECTED_COMPLEXITY}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    SELECTED_SCOPE_CAP=$(echo "${SELECTED_SCOPE}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')

    echo -e "${BLUE}Ontological Entity: ${SELECTED_ENTITY_CAP}${NC}"
    echo -e "${BLUE}Epistemological Action: ${SELECTED_ACTION_CAP}${NC}"
    echo -e "${BLUE}Teleological Value: ${SELECTED_VALUE_CAP}${NC}"
    echo -e "${BLUE}Complexity Level: ${SELECTED_COMPLEXITY_CAP}${NC}"
    echo -e "${BLUE}Impact Scope: ${SELECTED_SCOPE_CAP}${NC}"
    echo ""
}

# ============================================================================
# COMMIT EXECUTION AND HISTORY TRACKING
# ============================================================================

execute_commit() {
    local full_message="$FINAL_SUBJECT"
    
    if [[ -n "$FINAL_BODY" ]]; then
        full_message+="\n\n$FINAL_BODY"
    fi
    
    if [[ -n "$FINAL_FOOTER" ]]; then
        full_message+="\n\n$FINAL_FOOTER"
    fi
    
    # Execute the commit
    echo -e "$full_message" | git commit -F -
    
    # Record in history
    echo "$(date -Iseconds): $FINAL_SUBJECT" >> "$HISTORY_FILE"
    
    # Generate analytics if enabled
    if [[ "$ENABLE_COMMIT_ANALYTICS" == "true" ]]; then
        generate_commit_analytics
    fi
    
    echo -e "${GREEN}✅ Revolutionary commit executed successfully!${NC}"
}

generate_commit_analytics() {
    local analytics_file="$HOME/.rcfs_analytics"
    
    # Update analytics
    {
        echo "COMMIT_DATE=$(date -Iseconds)"
        echo "ENTITY=$SELECTED_ENTITY"
        echo "ACTION=$SELECTED_ACTION"
        echo "VALUE=$SELECTED_VALUE"
        echo "COMPLEXITY=$SELECTED_COMPLEXITY"
        echo "SCOPE=$SELECTED_SCOPE"
        echo "SUBJECT_LENGTH=${#FINAL_SUBJECT}"
        echo "BODY_LENGTH=${#FINAL_BODY}"
        echo "---"
    } >> "$analytics_file"
}

# ============================================================================
# MAIN ORCHESTRATION SYSTEM
# ============================================================================

display_main_menu() {
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                              MAIN OPTIONS                                     ║${NC}"
    echo -e "${WHITE}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${WHITE}║ 1) ${GREEN}Create Revolutionary Commit${NC}                                          ${WHITE}║${NC}"
    echo -e "${WHITE}║ 2) ${BLUE}View Commit Templates${NC}                                                ${WHITE}║${NC}"
    echo -e "${WHITE}║ 3) ${YELLOW}Analyze Commit History${NC}                                              ${WHITE}║${NC}"
    echo -e "${WHITE}║ 4) ${PURPLE}Configure Framework${NC}                                                ${WHITE}║${NC}"
    echo -e "${WHITE}║ 5) ${CYAN}Export Knowledge Base${NC}                                               ${WHITE}║${NC}"
    echo -e "${WHITE}║ 6) ${RED}Exit${NC}                                                                ${WHITE}║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

main_interactive_loop() {
    while true; do
        display_main_menu
        read -p "Select option (1-6): " choice
        
        case $choice in
            1) run_commit_creation_workflow ;;
            2) display_templates ;;
            3) analyze_commit_history ;;
            4) configure_framework ;;
            5) export_knowledge_base ;;
            6) echo -e "${GREEN}Thank you for using RCFS! 🚀${NC}"; exit 0 ;;
            *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        clear
    done
}

run_commit_creation_workflow() {
    clear
    display_framework_intro
    
    # Progressive knowledge elicitation
    elicit_ontological_understanding
    echo ""
    elicit_epistemological_understanding
    echo ""
    elicit_teleological_understanding
    echo ""
    elicit_complexity_and_impact
    echo ""
    elicit_contextual_information
    echo ""
    
    # Generate the revolutionary commit
    compose_revolutionary_commit
    
    # Display comprehensive preview
    display_commit_preview
    display_analysis_summary
    
    # Confirmation and execution
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                            EXECUTION OPTIONS                                  ║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo -e "${GREEN}1) Execute this revolutionary commit${NC}"
    echo -e "${YELLOW}2) Modify and refine${NC}"
    echo -e "${BLUE}3) Save as template${NC}"
    echo -e "${RED}4) Cancel${NC}"
    echo ""
    
    read -p "Choose action (1-4): " action_choice
    
    case $action_choice in
        1) execute_commit ;;
        2) run_commit_creation_workflow ;; # Restart the process
        3) save_as_template ;;
        4) echo -e "${YELLOW}Commit cancelled.${NC}" ;;
        *) echo -e "${RED}Invalid choice.${NC}" ;;
    esac
}

# ============================================================================
# ADDITIONAL UTILITY FUNCTIONS
# ============================================================================

display_templates() {
    echo -e "${BLUE}📋 Available Commit Templates:${NC}"
    if [[ -d "$TEMPLATES_DIR" && "$(ls -A "$TEMPLATES_DIR")" ]]; then
        ls -la "$TEMPLATES_DIR"
    else
        echo "No templates found. Create some using the main workflow!"
    fi
}

analyze_commit_history() {
    echo -e "${YELLOW}📊 Commit History Analysis:${NC}"
    if [[ -f "$HISTORY_FILE" ]]; then
        echo "Recent commits:"
        tail -10 "$HISTORY_FILE"
    else
        echo "No history available yet."
    fi
}

configure_framework() {
    echo -e "${PURPLE}⚙️ Framework Configuration:${NC}"
    echo "Current configuration:"
    cat "$CONFIG_FILE"
    echo ""
    read -p "Edit configuration? (y/n): " edit_config
    if [[ "$edit_config" == "y" ]]; then
        ${EDITOR:-nano} "$CONFIG_FILE"
        load_configuration
    fi
}

export_knowledge_base() {
    local export_file="rcfs_knowledge_export_$(date +%Y%m%d_%H%M%S).md"
    
    {
        echo "# Revolutionary Commit Framework System - Knowledge Export"
        echo "Generated: $(date)"
        echo ""
        echo "## Ontological Entities"
        for entity in "${!ONTOLOGICAL_ENTITIES[@]}"; do
            entity_CAP=$(echo "${entity}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
            echo "- **${entity_CAP}**: ${ONTOLOGICAL_ENTITIES[$entity]}"
        done
        echo ""
        echo "## Epistemological Actions"
        for action in "${!EPISTEMOLOGICAL_ACTIONS[@]}"; do
            action_CAP=$(echo "${action}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
            echo "- **${action_CAP}**: ${EPISTEMOLOGICAL_ACTIONS[$action]}"
        done
        echo ""
        echo "## Teleological Values"
        for value in "${!TELEOLOGICAL_VALUES[@]}"; do
            value_CAP=$(echo "${value}" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
            echo "- **${value_CAP}**: ${TELEOLOGICAL_VALUES[$value]}"
        done
    } > "$export_file"
    
    echo -e "${GREEN}Knowledge base exported to: $export_file${NC}"
}

save_as_template() {
    read -p "Template name: " template_name
    local template_file="$TEMPLATES_DIR/${template_name}.template"
    
    {
        echo "ENTITY=$SELECTED_ENTITY"
        echo "ACTION=$SELECTED_ACTION"
        echo "VALUE=$SELECTED_VALUE"
        echo "COMPLEXITY=$SELECTED_COMPLEXITY"
        echo "SCOPE=$SELECTED_SCOPE"
        echo "SUBJECT=$FINAL_SUBJECT"
        echo "BODY=$FINAL_BODY"
        echo "FOOTER=$FINAL_FOOTER"
    } > "$template_file"
    
    echo -e "${GREEN}Template saved: $template_file${NC}"
}

# ============================================================================
# PROGRAM ENTRY POINT
# ============================================================================

main() {
    # Initialize the framework
    initialize_framework
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}Error: Not in a git repository!${NC}"
        exit 1
    fi
    
    # Check for command line arguments for direct execution
    if [[ $# -gt 0 ]]; then
        case $1 in
            --quick|-q) run_quick_mode ;;
            --template|-t) use_template "$2" ;;
            --help|-h) display_help ;;
            *) echo -e "${RED}Unknown option: $1${NC}"; display_help; exit 1 ;;
        esac
    else
        # Run interactive mode
        main_interactive_loop
    fi
}

display_help() {
    echo -e "${WHITE}Revolutionary Commit Framework System (RCFS) v${VERSION}${NC}"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --quick, -q           Quick commit mode"
    echo "  --template, -t NAME   Use specific template"
    echo "  --help, -h            Show this help"
    echo ""
    echo "Interactive mode: Run without arguments"
}

run_quick_mode() {
    echo -e "${YELLOW}🚀 Quick Mode - Essential Questions Only${NC}"
    read -p "Component: " COMPONENT_NAME
    read -p "Action: " SELECTED_ACTION
    read -p "What changed: " NEW_UNDERSTANDING
    read -p "Why: " SELECTED_VALUE
    
    SELECTED_ENTITY="behavior"
    SELECTED_COMPLEXITY="moderate"
    SELECTED_SCOPE="module"
    CURRENT_STATE="Previous state"
    FUTURE_STATE="Improved state"
    
    compose_revolutionary_commit
    display_commit_preview
    
    read -p "Execute? (y/n): " confirm
    if [[ "$confirm" == "y" ]]; then
        execute_commit
    fi
}

use_template() {
    local template_name="$1"
    local template_file="$TEMPLATES_DIR/${template_name}.template"
    
    if [[ -f "$template_file" ]]; then
        source "$template_file"
        display_commit_preview
        read -p "Execute this template? (y/n): " confirm
        if [[ "$confirm" == "y" ]]; then
            execute_commit
        fi
    else
        echo -e "${RED}Template not found: $template_name${NC}"
    fi
}

# ============================================================================
# ADVANCED ANALYTICS AND LEARNING SYSTEM
# ============================================================================

generate_team_insights() {
    local insights_file="$HOME/.rcfs_team_insights"
    
    if [[ -f "$HOME/.rcfs_analytics" ]]; then
        echo -e "${BRAIN} Generating Team Development Insights..."
        
        # Analyze patterns in commit data
        local total_commits=$(grep -c "COMMIT_DATE=" "$HOME/.rcfs_analytics" 2>/dev/null || echo "0")
        local most_common_entity=$(grep "ENTITY=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | sort | uniq -c | sort -nr | head -1 | awk '{print $2}')
        local most_common_action=$(grep "ACTION=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | sort | uniq -c | sort -nr | head -1 | awk '{print $2}')
        local avg_subject_length=$(grep "SUBJECT_LENGTH=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | awk '{sum+=$1} END {print sum/NR}')
        
        {
            echo "# Team Development Insights - $(date)"
            echo ""
            echo "## Quantitative Analysis"
            echo "- Total RCFS commits: $total_commits"
            echo "- Most frequent entity focus: $most_common_entity"
            echo "- Most common action type: $most_common_action"
            echo "- Average subject line length: ${avg_subject_length%.*} characters"
            echo ""
            echo "## Patterns & Recommendations"
            
            if [[ "$most_common_entity" == "behavior" ]]; then
                echo "- High focus on behavioral changes suggests strong business logic evolution"
                echo "- Consider balancing with architectural improvements"
            fi
            
            if [[ "$most_common_action" == "clarify" ]]; then
                echo "- Team is actively improving code clarity - excellent trend!"
                echo "- Consider expanding into optimization and innovation actions"
            fi
            
            echo ""
            echo "## Suggested Focus Areas"
            echo "- Explore underutilized entity categories"
            echo "- Experiment with different epistemological approaches"
            echo "- Document architectural decisions more comprehensively"
            
        } > "$insights_file"
        
        echo -e "${GREEN}Team insights generated: $insights_file${NC}"
    else
        echo -e "${YELLOW}No analytics data available yet. Create some commits first!${NC}"
    fi
}

# ============================================================================
# INTEGRATION WITH EXTERNAL SYSTEMS
# ============================================================================

integrate_with_jira() {
    read -p "JIRA ticket number (e.g., PROJ-123): " jira_ticket
    if [[ -n "$jira_ticket" ]]; then
        RELATED_WORK="$jira_ticket"
        FINAL_FOOTER+="\nJIRA: $jira_ticket"
    fi
}

integrate_with_confluence() {
    read -p "Confluence page URL (optional): " confluence_url
    if [[ -n "$confluence_url" ]]; then
        FINAL_FOOTER+="\nDocumentation: $confluence_url"
    fi
}

generate_pull_request_description() {
    local pr_file="pr_description_$(date +%Y%m%d_%H%M%S).md"
    
    {
        echo "# Pull Request: $FINAL_SUBJECT"
        echo ""
        echo "## Summary"
        echo "$NEW_UNDERSTANDING"
        echo ""
        echo "## Changes Made"
        echo "**From:** $CURRENT_STATE"
        echo "**To:** $FUTURE_STATE"
        echo ""
        echo "## Impact Analysis"
        echo "- **Complexity:** $SELECTED_COMPLEXITY"
        echo "- **Scope:** $SELECTED_SCOPE"
        echo "- **Primary Value:** $SELECTED_VALUE"
        echo ""
        echo "## Stakeholder Impact"
        echo "$STAKEHOLDERS"
        echo ""
        echo "## Future Implications"
        echo "$FUTURE_IMPLICATIONS"
        echo ""
        echo "## Risk Assessment"
        echo "$RISKS"
        echo ""
        echo "## Testing Strategy"
        echo "Evidence: $EVIDENCE"
        echo "Methodology: $METHODOLOGY"
        echo ""
        echo "## Dependencies"
        echo "$DEPENDENCIES"
        echo ""
        if [[ -n "$RELATED_WORK" ]]; then
            echo "## Related Work"
            echo "$RELATED_WORK"
            echo ""
        fi
        echo "---"
        echo "*Generated by Revolutionary Commit Framework System v${VERSION}*"
    } > "$pr_file"
    
    echo -e "${GREEN}Pull request description generated: $pr_file${NC}"
}

# ============================================================================
# COLLABORATIVE FEATURES
# ============================================================================

share_commit_template() {
    local template_name="$1"
    local shared_dir="$HOME/.rcfs_shared"
    mkdir -p "$shared_dir"
    
    if [[ -f "$TEMPLATES_DIR/${template_name}.template" ]]; then
        cp "$TEMPLATES_DIR/${template_name}.template" "$shared_dir/"
        echo -e "${GREEN}Template shared: $shared_dir/${template_name}.template${NC}"
        echo "Team members can import with: rcfs --import-template $template_name"
    else
        echo -e "${RED}Template not found: $template_name${NC}"
    fi
}

import_shared_template() {
    local template_name="$1"
    local shared_file="$HOME/.rcfs_shared/${template_name}.template"
    
    if [[ -f "$shared_file" ]]; then
        cp "$shared_file" "$TEMPLATES_DIR/"
        echo -e "${GREEN}Template imported: $template_name${NC}"
    else
        echo -e "${RED}Shared template not found: $template_name${NC}"
    fi
}

# ============================================================================
# ADVANCED CONFIGURATION AND PERSONALIZATION
# ============================================================================

setup_personal_ontology() {
    echo -e "${PURPLE}🎯 Personal Ontology Customization${NC}"
    echo "Add your domain-specific entities:"
    
    local custom_ontology="$HOME/.rcfs_custom_ontology"
    
    while true; do
        read -p "Entity name (or 'done' to finish): " entity_name
        [[ "$entity_name" == "done" ]] && break
        
        read -p "Description for $entity_name: " entity_desc
        echo "${entity_name}=${entity_desc}" >> "$custom_ontology"
        echo -e "${GREEN}Added: $entity_name${NC}"
    done
    
    echo -e "${BLUE}Custom ontology saved. Restart RCFS to load new entities.${NC}"
}

load_custom_ontology() {
    local custom_file="$HOME/.rcfs_custom_ontology"
    if [[ -f "$custom_file" ]]; then
        while IFS='=' read -r key value; do
            [[ -n "$key" && -n "$value" ]] && ONTOLOGICAL_ENTITIES["$key"]="$value"
        done < "$custom_file"
    fi
}

# ============================================================================
# QUALITY ASSURANCE AND VALIDATION
# ============================================================================

validate_commit_quality() {
    local score=0
    local max_score=100
    local feedback=""
    
    # Subject line quality (30 points)
    if [[ ${#FINAL_SUBJECT} -ge 10 && ${#FINAL_SUBJECT} -le 72 ]]; then
        score=$((score + 20))
    else
        feedback+="⚠️ Subject line length could be improved\n"
    fi
    
    if [[ "$FINAL_SUBJECT" =~ [A-Z] ]]; then
        score=$((score + 10))
    else
        feedback+="⚠️ Consider proper capitalization\n"
    fi
    
    # Content completeness (40 points)
    [[ -n "$NEW_UNDERSTANDING" ]] && score=$((score + 10))
    [[ -n "$EVIDENCE" ]] && score=$((score + 10))
    [[ -n "$METHODOLOGY" ]] && score=$((score + 10))
    [[ -n "$LONG_TERM_VISION" ]] && score=$((score + 10))
    
    # Philosophical depth (30 points)
    [[ -n "$SELECTED_ENTITY" && "$SELECTED_ENTITY" != "behavior" ]] && score=$((score + 10))
    [[ -n "$SELECTED_ACTION" && "$SELECTED_ACTION" != "clarify" ]] && score=$((score + 10))
    [[ -n "$TRADEOFFS" ]] && score=$((score + 10))
    
    # Display quality assessment
    echo -e "${BLUE}📊 Commit Quality Score: $score/$max_score${NC}"
    
    if [[ $score -ge 80 ]]; then
        echo -e "${GREEN}🌟 Excellent! Revolutionary quality achieved.${NC}"
    elif [[ $score -ge 60 ]]; then
        echo -e "${YELLOW}👍 Good quality, with room for enhancement.${NC}"
    else
        echo -e "${RED}⚠️ Consider adding more depth and context.${NC}"
    fi
    
    if [[ -n "$feedback" ]]; then
        echo -e "${CYAN}Suggestions for improvement:${NC}"
        echo -e "$feedback"
    fi
}

# ============================================================================
# EXTENDED MAIN MENU WITH ALL FEATURES
# ============================================================================

display_extended_menu() {
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                          REVOLUTIONARY OPTIONS                                ║${NC}"
    echo -e "${WHITE}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${WHITE}║ 1) ${GREEN}Create Revolutionary Commit${NC}          11) ${PURPLE}Setup Personal Ontology${NC}     ${WHITE}║${NC}"
    echo -e "${WHITE}║ 2) ${BLUE}View Commit Templates${NC}                12) ${CYAN}Generate Team Insights${NC}       ${WHITE}║${NC}"
    echo -e "${WHITE}║ 3) ${YELLOW}Analyze Commit History${NC}               13) ${GREEN}Create PR Description${NC}       ${WHITE}║${NC}"
    echo -e "${WHITE}║ 4) ${PURPLE}Configure Framework${NC}                 14) ${BLUE}Share Template${NC}              ${WHITE}║${NC}"
    echo -e "${WHITE}║ 5) ${CYAN}Export Knowledge Base${NC}                15) ${YELLOW}Import Template${NC}             ${WHITE}║${NC}"
    echo -e "${WHITE}║ 6) ${GREEN}Quick Commit Mode${NC}                    16) ${RED}Validate Commit Quality${NC}      ${WHITE}║${NC}"
    echo -e "${WHITE}║ 7) ${BLUE}Use Template${NC}                        17) ${PURPLE}JIRA Integration${NC}            ${WHITE}║${NC}"
    echo -e "${WHITE}║ 8) ${YELLOW}Save Current as Template${NC}            18) ${CYAN}Confluence Integration${NC}     ${WHITE}║${NC}"
    echo -e "${WHITE}║ 9) ${PURPLE}View Analytics${NC}                      19) ${GREEN}Backup Configuration${NC}       ${WHITE}║${NC}"
    echo -e "${WHITE}║10) ${CYAN}Help & Documentation${NC}                20) ${RED}Exit${NC}                        ${WHITE}║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

extended_interactive_loop() {
    # Load custom ontology on startup
    load_custom_ontology
    
    while true; do
        display_extended_menu
        read -p "Select option (1-20): " choice
        
        case $choice in
            1) run_commit_creation_workflow ;;
            2) display_templates ;;
            3) analyze_commit_history ;;
            4) configure_framework ;;
            5) export_knowledge_base ;;
            6) run_quick_mode ;;
            7) read -p "Template name: "; use_template "$REPLY" ;;
            8) save_as_template ;;
            9) view_analytics ;;
            10) display_comprehensive_help ;;
            11) setup_personal_ontology ;;
            12) generate_team_insights ;;
            13) generate_pull_request_description ;;
            14) read -p "Template name to share: "; share_commit_template "$REPLY" ;;
            15) read -p "Template name to import: "; import_shared_template "$REPLY" ;;
            16) validate_commit_quality ;;
            17) integrate_with_jira ;;
            18) integrate_with_confluence ;;
            19) backup_configuration ;;
            20) echo -e "${GREEN}🚀 Thank you for advancing the art of commits! 🚀${NC}"; exit 0 ;;
            *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        clear
    done
}

view_analytics() {
    if [[ -f "$HOME/.rcfs_analytics" ]]; then
        echo -e "${CYAN}📊 Detailed Analytics:${NC}"
        
        local total=$(grep -c "COMMIT_DATE=" "$HOME/.rcfs_analytics")
        echo "Total commits: $total"
        
        echo ""
        echo "Entity distribution:"
        grep "ENTITY=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | sort | uniq -c | sort -nr
        
        echo ""
        echo "Action distribution:"
        grep "ACTION=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | sort | uniq -c | sort -nr
        
        echo ""
        echo "Value distribution:"
        grep "VALUE=" "$HOME/.rcfs_analytics" | cut -d'=' -f2 | sort | uniq -c | sort -nr
    else
        echo -e "${YELLOW}No analytics data available yet.${NC}"
    fi
}

backup_configuration() {
    local backup_dir="$HOME/.rcfs_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    [[ -f "$CONFIG_FILE" ]] && cp "$CONFIG_FILE" "$backup_dir/"
    [[ -f "$HISTORY_FILE" ]] && cp "$HISTORY_FILE" "$backup_dir/"
    [[ -d "$TEMPLATES_DIR" ]] && cp -r "$TEMPLATES_DIR" "$backup_dir/"
    [[ -f "$HOME/.rcfs_analytics" ]] && cp "$HOME/.rcfs_analytics" "$backup_dir/"
    [[ -f "$HOME/.rcfs_custom_ontology" ]] && cp "$HOME/.rcfs_custom_ontology" "$backup_dir/"
    
    echo -e "${GREEN}Configuration backed up to: $backup_dir${NC}"
}

display_comprehensive_help() {
    cat << 'EOF'
════════════════════════════════════════════════════════════════════════════════
🧠 REVOLUTIONARY COMMIT FRAMEWORK SYSTEM (RCFS) - COMPREHENSIVE GUIDE
════════════════════════════════════════════════════════════════════════════════

PHILOSOPHY:
RCFS integrates multiple disciplines to create commits that are not just 
functional records, but comprehensive knowledge artifacts that capture:

🎯 WHAT changed (Ontology) - The entities and structures in your codebase
🧠 HOW we learned (Epistemology) - The process of discovery and understanding  
🌟 WHY it matters (Teleology) - The ultimate purpose and values served

CORE PRINCIPLES:
1. Every commit tells a complete story
2. Context and intent are preserved for future developers
3. Learning and methodology are documented
4. Long-term vision guides short-term changes
5. Quality is measured holistically

WORKFLOW PHASES:
1. Ontological Analysis - Identify what entities are being modified
2. Epistemological Inquiry - Understand how knowledge was gained
3. Teleological Reflection - Connect to higher purposes and values
4. Complexity Assessment - Evaluate scope and impact
5. Contextual Integration - Connect to broader ecosystem
6. Quality Validation - Ensure completeness and clarity

ADVANCED FEATURES:
- Template system for repeatable patterns
- Analytics and team insights
- Integration with JIRA/Confluence
- Custom ontology support
- Collaborative template sharing
- Automated PR description generation

CONFIGURATION:
Edit ~/.rcfs_config to customize behavior, including:
- Commit message style preferences
- Feature toggles for different aspects
- Integration settings
- Quality thresholds

BEST PRACTICES:
- Use the framework consistently across your team
- Customize ontologies for your domain
- Regular review of analytics and patterns
- Share successful templates with teammates
- Iterate and improve your approach over time

For more advanced usage, see the exported knowledge base and template examples.
EOF
}

# ============================================================================
# FINAL PROGRAM ORCHESTRATION
# ============================================================================

# Override the main function to use extended menu
main() {
    # Initialize the framework
    initialize_framework
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}Error: Not in a git repository!${NC}"
        exit 1
    fi
    
    # Display welcome message
    echo -e "${WHITE}${INFINITY} Welcome to Revolutionary Commit Framework System v${VERSION} ${INFINITY}${NC}"
    echo -e "${CYAN}Transforming commits into knowledge artifacts...${NC}"
    echo ""
    
    # Check for command line arguments for direct execution
    if [[ $# -gt 0 ]]; then
        case $1 in
            --quick|-q) run_quick_mode ;;
            --template|-t) use_template "$2" ;;
            --import-template) import_shared_template "$2" ;;
            --share-template) share_commit_template "$2" ;;
            --analytics|-a) view_analytics ;;
            --insights|-i) generate_team_insights ;;
            --backup|-b) backup_configuration ;;
            --help|-h) display_comprehensive_help ;;
            --version|-v) echo "RCFS v${VERSION}"; exit 0 ;;
            *) echo -e "${RED}Unknown option: $1${NC}"; display_comprehensive_help; exit 1 ;;
        esac
    else
        # Run extended interactive mode
        extended_interactive_loop
    fi
}

# Execute main function with all arguments
main "$@"