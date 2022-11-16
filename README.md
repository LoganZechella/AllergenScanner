# Personal Allergen Scanner and Checker
This tool is designed to make it easier for those with food allergies to check if the product they are buying is safe for them to consume. It works by utilizing the Edamam Food and Grocery Database API and an open-source barcode scanner HTML/JS library by ZXing. After inputing allergens and scanning a barcode for a product found within the database, it will then display the name of the product, if the ingredients list contains any of the previously inputed allergens, and the full ingredients list ready for the user to view if desired.

At present, the tool is fully functioning and is able to persist user data at a basic level. Some patience is required when scanning barcodes as the API is reliant on the autofocus ability of the input device, and requires a well-lit environment to function optimally. The app is currently being hosted on Netlify and can be found at https://harmonious-flan-5d68c9.netlify.app/?allergen-input=#.  

# Features 
## Feature Set Group 1
1. Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.
2. Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
3. Analyze text and display useful information about it. (e.g. word/character count in an input field).
## Feature Set Group 2
4. Retrieve data from a third-party API and use it to display something within your app.
5.  Create a form and store the submitted values using an external API (e.g. a contact form, survey, etc).
6. Persist data to an external API and make the stored data accessible in your app (including after reload/refresh).
## Feature Set Group 3
7.  Implement modern interactive UI features (e.g. table/data sorting, autocomplete, drag-and-drop, calendar-date-picker, etc).

