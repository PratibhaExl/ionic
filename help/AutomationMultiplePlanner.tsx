Below is a COPY-PASTE READY, REALISTIC, PRODUCTION-SAFE solution for plain-text based automation in a Teams channel, using double quotes + delimiter.
This is the BEST possible approach when you cannot use cards or forms.

I’m giving you:

Best text format to share with users

Exact Power Automate expressions (copy–paste)

Why this format is the safest

🏆 BEST TEXT FORMAT (STRICT & SAFE)

👉 Pin this in your Teams channel

TASKS:
"email"|"task title"|"bucket name"|"YYYY-MM-DD"|"task description"
"email"|"task title"|"bucket name"|"YYYY-MM-DD"|"task description"

✅ Example (REALISTIC)
TASKS:
"rahul@company.com"|"Prepare sales report"|"Sales"|"2026-01-20"|"Prepare and share Q4 sales report"
"neha@company.com"|"Validate data"|"Review"|"2026-01-22"|"Check data accuracy and highlight gaps"
"amit@company.com"|"Client follow-up"|"Follow Up"|"2026-01-25"|"Call client and update CRM"

🔐 WHY THIS FORMAT IS THE BEST
Feature	Why
Double quotes	Protect spaces & commas
Pipe `	`
Date format	Planner accepts directly
Email (not mention)	Always resolvable
One task per line	Easy loop

⚠️ Rules (non-negotiable)

Use double quotes

Use pipe (|) only

Use email ID

Date must be YYYY-MM-DD

First line must be TASKS:

🧱 POWER AUTOMATE FLOW (COPY-PASTE STEPS)
🟦 STEP 1: Trigger

Trigger:
👉 Microsoft Teams → When a new channel message is added

🟦 STEP 2: Filter Only TASK Messages

Condition

Left
contains(triggerOutputs()?['body/body/content'], 'TASKS:')

Operator
is equal to

Right
true

🟦 STEP 3: Get Message Content

Compose – MessageText

@{triggerOutputs()?['body/body/content']}

🟦 STEP 4: Split Message into Lines

Compose – Lines

@{split(outputs('MessageText'), '\n')}

🟦 STEP 5: Loop Through Lines

Apply to each
Value

@{outputs('Lines')}

🟦 STEP 6: Skip Header Line

Condition

contains(item(), '"|"')


➡ YES → Continue
➡ NO → Skip

🟦 STEP 7: Split Line into Fields

Compose – Columns

@{split(item(), '|"|')}


After split:

Index	Value
0	"email
1	task title
2	bucket name
3	YYYY-MM-DD
4	task description"
🟦 STEP 8: Clean Quotes (IMPORTANT)

Use expression directly in fields:

Email
@{replace(outputs('Columns')[0], '"', '')}

Title
@{outputs('Columns')[1]}

Bucket Name
@{outputs('Columns')[2]}

Due Date
@{outputs('Columns')[3]}

Description
@{replace(outputs('Columns')[4], '"', '')}

🟦 STEP 9: Map Bucket Name → Bucket ID

⚠️ Planner requires Bucket ID, not name.

Example condition:
equals(outputs('Columns')[2], 'Sales')


→ BucketId_Sales

equals(outputs('Columns')[2], 'Review')


→ BucketId_Review

(Yes, this is standard practice.)

🟦 STEP 10: Create Planner Task

👉 Planner – Create a task

Field	Value
Plan Id	Your Plan
Title	Title expression
Assign to	Email expression
Due date	Due date
Bucket Id	From condition
🟦 STEP 11: Update Description

👉 Planner – Update task details

Field	Value
Task Id	From Create Task
Description	Description expression
🟦 STEP 12: Set Status = In Progress

👉 Planner – Update task

Field	Value
Percent complete	50
🟢 FINAL RESULT

Multiple tasks created

Multiple users assigned

Multiple buckets supported

Due dates applied

Descriptions applied

Status = In Progress

No cards

No mentions

Fully text-based

Production-safe

🚨 LIMITATIONS (HONEST)
Limitation	Reason
Format strict	Text parsing
Typos break flow	No validation
Bucket mapping manual	Planner API
📌 PIN THIS MESSAGE IN TEAMS

🔔 Task creation format (copy & paste)
Follow EXACT format below.
Use quotes & pipe only.

TASKS:
"email"|"title"|"bucket"|"YYYY-MM-DD"|"description"

