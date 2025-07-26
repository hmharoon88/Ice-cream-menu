import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Sheets API with your service account
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "ice-cream-menu-467120",
    private_key_id: "452213f13230d913fe4a5764cce02a2933a5322d",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyG5eqRLJILRU8\nd74I1SRREFBQKYg3CI8uwVSfbpqDxg7q50ZIURVRd/tKQNSjhARXvxpHdLerYIAN\nQxquZOv26g6X3i7lSByXvPGBLRwOAllQLpbmp0SIPfmWmm5OHP3KQtit7PgrQCZz\n7n/Xef4JT9Hu5DYVk0lObQ3MeFppDncbqUvS57fOmj7VIA7+w1HriJN7HcxtFN3k\nbtWzUmTm0IuJ7SovAQTZgQoJX4ovGKhwFAWQysTPy1UcSbIWjQo+ctDyXb9vDoWa\nLHuR+1fKjqATifWB16ZZ7jOk0BKfBCvvq5jfDocTEgrj4D1vlXp5T8Z/BH3WH5X3\nFEa4bmh3AgMBAAECggEAGx+pmrQIhIZdGA7SQW0YMUIvQO36QQtMJt4pYXhKDqxQ\nZEShRu0WNohzm+zAlUBLGwPO4DftqqsxBRQFka5r4vflDgq3kJJJTHBpRPdWMOn5\nqQTXVTv+61Ko2l8dUkcG/VDtx5rxdkC4OmqFTI7W+ZsOyPc3J1T9UnS4J73iYuIg\nb61anaQbVQ0ZPebK+V03XtEWPOo8sjiGv2sPfsGkImgGMj+aFlv6rQDpeGNgEAd6\nLYQdJdfbc58Y9wTNxPw5/RdEZ+vhzE49E1LAlWMg1z8K+I010GzY3ofHixOPItbO\ncgDYK6XkmctVLZSzvNkYSy8UYfGuF8CfdsGZ5yuxtQKBgQDhGdWCKfct7wtFPJNk\n64BTkFXjnUXPGUNnMuLmnr7LZB+FrtTMa4GHnr9EESShL4DQ2V7/hhZKEOCNrePQ\ni8bqAX++F0qDIZScCuTKKKTV08YsENUzwYSn8OrJMgIju6167M68bp908E9EUsGL\nH0JZ23aH461YFkSdpSS+CP6LiwKBgQDKjmUP2fAxZv4LfJ2fSQ7G5mogym1intNz\ny+gscJ4/SQ1FQXTttmovmaWcOrgLhpnZsTI0TX9dEboX1Ad+kGd6YH5uJvQNZZLP\nCTY6TVKaX4ppvD2niJHau/Loe8eAm8A75ejFZJGxJfS60kYmoqPRmDV3rW9VoH4f\nzGz4pAHkRQKBgGm82edf0SV5kYC/eLlCSrB2L3JREVa8FkZmx+DvFs6xxIDmZD12\nDo1nS48swlkY2FjCkvZSxSubi+/hjA8Naa3IcHoZtL2uS4GVOG2h8/Qhm4hdi9jZ\nAXhmGdPSsuCYK2B/1oj7KdojfAirGxE/6MoO5jnlACtNooOu7Hh7/x4LAoGAQI5H\naVjlM2mGt/R8a+Kl4gBXfKHnYNILxFENavRtiu/mWdc1w/kqOId4f6U7OPkqGXZe\n8MpuOCRJMgTyaoTtZdRRFxw1Ffv0YSWnccdo9yhR/cbvw3BEQ/k4vp2MhNGe37gz\nio213Uaii9QuZWvaWBdxmvXckOa4q7vEUy46KB0CgYBV6z51sKk9Bg8MiQLy0QJB\n3NJUzg8lqxb1IxRaGCTgI/1f6ocqx4+OOZISEbuZC4TSzuOsjydGSFD8Y6i42ty3\nlY3/v5gv0mahYDklHbcgY/a3IwIxnS0Osx5tfV9FqhHbD7yzBEODX6SM0/JGuCB/\nUdU3JeBT9ersRw3gUx/2wQ==\n-----END PRIVATE KEY-----\n",
    client_email: "ice-cream-menu-logan-sunoco@ice-cream-menu-467120.iam.gserviceaccount.com",
    client_id: "111190124334751339956"
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function GET() {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Your Google Sheet ID
    const spreadsheetId = '10qHmL8MqUxZMXVl6EWFKeTqcAIkrnxbxLVKGNo-cbG4';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:D', // Adjust range based on your sheet structure
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found in Google Sheet' }, { status: 404 });
    }

    // Assuming first row is headers
    const headers = rows[0];
    const data = rows.slice(1).map((row, index) => {
      const item: Record<string, string> = {};
      headers.forEach((header: string, i: number) => {
        item[header.toLowerCase().replace(/\s+/g, '_')] = row[i] || '';
      });
      return item;
    });

    return NextResponse.json({ 
      data,
      message: "Successfully fetched data from Google Sheets"
    });
    
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    
    // Fallback to mock data if there's an error
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

    return NextResponse.json({ 
      data: mockData,
      message: "Using fallback data due to Google Sheets error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 