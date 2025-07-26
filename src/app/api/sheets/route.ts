import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, let's use a public sheet approach or mock data
    // You can later add proper authentication
    
    // Mock data that matches your sheet structure
    const mockData = [
      {
        name: "Vanilla Bean",
        description: "Classic vanilla with real vanilla bean specks",
        price: "$4.50",
        category: "Classic"
      },
      {
        name: "Chocolate Fudge", 
        description: "Rich chocolate with fudge swirls",
        price: "$5.00",
        category: "Classic"
      },
      {
        name: "Strawberry",
        description: "Fresh strawberry with real fruit pieces", 
        price: "$4.75",
        category: "Fruit"
      },
      {
        name: "Mint Chocolate Chip",
        description: "Cool mint with chocolate chips",
        price: "$5.25", 
        category: "Classic"
      },
      {
        name: "Cookie Dough",
        description: "Vanilla with cookie dough chunks",
        price: "$5.50",
        category: "Specialty"
      },
      {
        name: "Rocky Road", 
        description: "Chocolate with marshmallows and nuts",
        price: "$5.75",
        category: "Specialty"
      }
    ];

    // TODO: Replace with actual Google Sheets API call
    // const auth = new google.auth.GoogleAuth({
    //   credentials: {
    //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    //   },
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    // });
    
    // const sheets = google.sheets({ version: 'v4', auth });
    // const response = await sheets.spreadsheets.values.get({
    //   spreadsheetId: '10qHmL8MqUxZMXVl6EWFKeTqcAIkrnxbxLVKGNo-cbG4',
    //   range: 'Sheet1!A:D',
    // });

    return NextResponse.json({ 
      data: mockData,
      message: "Using mock data. Set up Google Sheets API for live data."
    });
    
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    );
  }
} 