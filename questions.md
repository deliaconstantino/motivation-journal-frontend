# Questions:

1. I want to make a request to my backend to get one random entry from a database table. Should that go to index and make a POSTGRES request for random in the index action? Or a special action? Or should that be a special method in my model, and if so how do I call to that method from the frontend?
- can do a SQL query for postgres from quote model then call a special route to that action from front end

2. put classes in their own files --load the index.js file last in the script

3. will this line  <div id="quote-container"></div> from index.html (where I load the quote) inherit class .container from it's outer <div> or do I need to specify that?
