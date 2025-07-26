# Google Sheets Integration Setup

## Step 1: Get Your Google Sheet ID

1. Open your Google Sheet
2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Replace `YOUR_SHEET_ID_HERE` with your actual sheet ID

## Step 2: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "Service Account"
5. Download the JSON key file

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
GOOGLE_SPREADSHEET_ID=your_actual_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from the JSON file\n-----END PRIVATE KEY-----\n"
```

## Step 4: Share Your Google Sheet

1. Open your Google Sheet
2. Click "Share" in the top right
3. Add your service account email as an "Editor"
4. Make sure the sheet is accessible

## Step 5: Format Your Google Sheet

Your sheet should have columns like:
- Name (or Flavor)
- Description
- Price
- Category

Example:
| Name | Description | Price | Category |
|------|-------------|-------|----------|
| Vanilla Bean | Classic vanilla with real vanilla bean specks | $4.50 | Classic |
| Chocolate Fudge | Rich chocolate with fudge swirls | $5.00 | Classic |

## Step 6: Deploy to Vercel

1. Add the environment variables to your Vercel project
2. Deploy the updated code

## Troubleshooting

- Make sure your service account has access to the sheet
- Check that the sheet ID is correct
- Verify the environment variables are set correctly
- The API will fallback to sample data if there are any issues 