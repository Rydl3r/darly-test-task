# Test task for Dairy Solutions

## Done by Ivan Mukoed

The project contains:

- A data table with infinite scroll and "id", "userId", "title" and "body" fields
- A form which adds new entries to the table via API, has validation and a button to submit with disabled state. There are notifications if the submission is successful or not.

The project uses:

- React as main engine
- JSONPlaceholder as fake API
- Typescript as type checker
- Material UI as UI library
- No state manager (because the project is small and simple, it does not operate on big amounts of data)

Also, the instruction said that there should be at least 5 fields in the form, but given that the API supports only 3 field, I decided to add only 3 fields to the form. I could add more fields, but it would be useless, because the API would not accept them.
