# README

Rails 5 app built to investigate authentication and authorisation in techniques.
- Devise provided user authentication
- omniauth-google  allowed authentication via a 3rd party
- Petergate - provided user authorisation

The Bootstrap and Font awesome gems were added to provide the styles and icons respectively. The Devise error messages were customised to fit into the bootstrap alert styles.

Users can register using the signup page or via their Google account. Users Who have registered can also then sign in via google, and the two accounts will be associated together so that they can sign in with either. If on the other hand a user signs in via google first, they can not then register via the sign up page - they will be presented with the 'Email already taken' error.

TODO:
- add Github signin
- add sign in confirmation when registering

