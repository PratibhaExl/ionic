
<p>Hello,</p>
<p>You are invited to a <b>Project Review Meeting</b>.</p>
<p><a href="@{outputs('Create_a_Teams_meeting')?['body/joinUrl']}">Join Microsoft Teams Meeting</a></p>
<p><b>Date:</b> 13 Nov 2025<br>
<b>Time:</b> 2:00 PM - 7:00 PM PST</p>
<p>Regards,<br>Pratibha</p>



BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:@{utcNow()}
DTSTAMP:@{utcNow()}
DTSTART;TZID=Pacific Standard Time:20251113T140000
DTEND;TZID=Pacific Standard Time:20251113T190000
SUMMARY:Project Review Meeting
LOCATION:Microsoft Teams Meeting
DESCRIPTION:Please join using the below Teams link:\n@{outputs('Create_a_Teams_meeting')?['body/joinUrl']}
END:VEVENT
END:VCALENDAR



{
  "name": "FormAndMeetingEmailFlow",
  "type": "Flow",
  "properties": {
    "definition": {
      "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
      "actions": {
        "Get_item": {
          "type": "OpenApiConnection",
          "inputs": {
            "host": {
              "connection": {
                "name": "@parameters('$connections')['sharepoint']['connectionId']"
              }
            },
            "method": "get",
            "path": "/datasets/@{encodeURIComponent('[YourSiteURL]')}/tables/@{encodeURIComponent('[YourListName]')}/items/@{encodeURIComponent(triggerBody()?['ID'])}",
            "authentication": "@parameters('$authentication')"
          },
          "runAfter": {}
        },
        "Get_ClientTemplate": {
          "type": "OpenApiConnection",
          "inputs": {
            "host": {
              "connection": {
                "name": "@parameters('$connections')['onedriveforbusiness']['connectionId']"
              }
            },
            "method": "get",
            "path": "/drive/root:/PowerAutomate/Templates/ClientTemplate.html:/content",
            "authentication": "@parameters('$authentication')"
          },
          "runAfter": {
            "Get_item": [
              "Succeeded"
            ]
          }
        },
        "Get_UserTemplate": {
          "type": "OpenApiConnection",
          "inputs": {
            "host": {
              "connection": {
                "name": "@parameters('$connections')['onedriveforbusiness']['connectionId']"
              }
            },
            "method": "get",
            "path": "/drive/root:/PowerAutomate/Templates/UserTemplate.html:/content",
            "authentication": "@parameters('$authentication')"
          },
          "runAfter": {
            "Get_item": [
              "Succeeded"
            ]
          }
        },
        "Condition_IsClient": {
          "type": "If",
          "expression": {
            "equals": [
              "@outputs('Get_item')?['body/IsClient']",
              true
            ]
          },
          "actions": {
            "Send_ClientEmail": {
              "type": "OpenApiConnection",
              "inputs": {
                "host": {
                  "connection": {
                    "name": "@parameters('$connections')['office365']['connectionId']"
                  }
                },
                "method": "sendMail",
                "path": "/v2/Mail",
                "body": {
                  "To": "@outputs('Get_item')?['body/ClientEmail']",
                  "Subject": "Please Complete Your Form",
                  "Body": "@outputs('Get_ClientTemplate')",
                  "IsHtml": true
                },
                "authentication": "@parameters('$authentication')"
              },
              "runAfter": {}
            }
          },
          "else": {
            "Send_UserEmail": {
              "type": "OpenApiConnection",
              "inputs": {
                "host": {
                  "connection": {
                    "name": "@parameters('$connections')['office365']['connectionId']"
                  }
                },
                "method": "sendMail",
                "path": "/v2/Mail",
                "body": {
                  "To": "@outputs('Get_item')?['body/UserEmail']",
                  "Subject": "Action Required: Please Submit the Form",
                  "Body": "@outputs('Get_UserTemplate')",
                  "IsHtml": true
                },
                "authentication": "@parameters('$authentication')"
              },
              "runAfter": {}
            }
          }
        },
        "Send_MeetingEmail": {
          "type": "OpenApiConnection",
          "inputs": {
            "host": {
              "connection": {
                "name": "@parameters('$connections')['office365']['connectionId']"
              }
            },
            "method": "sendMail",
            "path": "/v2/Mail",
            "body": {
              "To": "@outputs('Get_item')?['body/UserEmail']",
              "Subject": "Meeting Invitation: Form Submission Review",
              "Body": "<p>Dear @{outputs('Get_item')?['body/Name']},</p><p>Thank you for submitting the form. We would like to invite you to a meeting.</p><ul><li><b>Subject:</b> Form Submission Review</li><li><b>Date:</b> 2025-11-01</li><li><b>Time:</b> 10:30 AM – 11:00 AM (IST)</li><li><b>Location:</b> Microsoft Teams Meeting</li></ul><p><a href=\"https://outlook.office.com/calendar/addevent?subject=Form+Submission+Review&startdt=2025-11-01T10:30:00&enddt=2025-11-01T11:00:00&body=Discussion+about+your+recent+form+submission.&location=Microsoft+Teams+Meeting\" style=\"background-color:#0078D7;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:5px;\">Add to Calendar</a></p><p>Best regards,<br/>Team</p>",
              "IsHtml": true
            },
            "authentication": "@parameters('$authentication')"
          },
          "runAfter": {
            "Condition_IsClient": [
              "Succeeded"
            ]
          }
        }
      },
      "triggers": {
        "When_an_item_is_created": {
          "type": "OpenApiConnectionWebhook",
          "inputs": {
            "host": {
              "connection": {
                "name": "@parameters('$connections')['sharepoint']['connectionId']"
              }
            },
            "method": "post",
            "path": "/datasets/@{encodeURIComponent('[YourSiteURL]')}/tables/@{encodeURIComponent('[YourListName]')}/onupdateditems",
            "authentication": "@parameters('$authentication')"
          }
        }
      },
      "contentVersion": "1.0.0.0"
    }
  },
  "parameters": {}
}
