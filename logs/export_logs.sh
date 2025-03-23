
JENKINS_URL="http://localhost:8080"
JOB_NAME="Weather"
GIT_REPO_PATH="https://github.com/ayushsharma-1/Weather-Management-System" 
LOGS_DIR="$GIT_REPO_PATH/logs"
BRANCH="main"

GIT_USER_NAME="ayushsharma-1"
GIT_USER_EMAIL="ayushsharma18001@gmail.com"

if [ ! -d "$LOGS_DIR" ]; then
    echo "Logs directory does not exist. Creating $LOGS_DIR"
    mkdir -p "$LOGS_DIR"
fi

cd "$GIT_REPO_PATH" || { echo "Git repo path not found! Exiting."; exit 1; }

BUILD_NUMBER=$(curl -s "$JENKINS_URL/job/$JOB_NAME/lastBuild/buildNumber")

if [ -z "$BUILD_NUMBER" ]; then
    echo "Failed to fetch build number. Exiting."
    exit 1
fi

echo "Latest build number: $BUILD_NUMBER"

CONSOLE_LOG=$(curl -s "$JENKINS_URL/job/$JOB_NAME/$BUILD_NUMBER/consoleText")

if [ -z "$CONSOLE_LOG" ]; then
    echo "Failed to fetch console log. Exiting."
    exit 1
fi

CSV_FILE="$LOGS_DIR/build_$BUILD_NUMBER.csv"
echo "Line Number,Log Message" > "$CSV_FILE"

LINE_NUM=1
while IFS= read -r line; do
    ESCAPED_LINE=$(echo "$line" | sed 's/"/""/g')
    echo "$LINE_NUM,\"$ESCAPED_LINE\"" >> "$CSV_FILE"
    LINE_NUM=$((LINE_NUM + 1))
done <<< "$CONSOLE_LOG"

echo "CSV log file created: $CSV_FILE"

git config user.name "$GIT_USER_NAME"
git config user.email "$GIT_USER_EMAIL"

git add "$CSV_FILE"

if git diff --cached --quiet; then
    echo "No changes to commit."
else
    git commit -m "Add Jenkins build log for build #$BUILD_NUMBER"
    git push origin "$BRANCH"
    echo "Pushed logs for build #$BUILD_NUMBER to GitHub."
fi
