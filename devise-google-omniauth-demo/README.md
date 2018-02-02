# README

Rails 5 app built to investigate authentication and authorisation in techniques.
- Devise provided user authentication
- omniauth-google and omniauth-github authentication
- Petergate - provided user authorisation
- confirmation email when registering

The Bootstrap and Font awesome gems were added to provide the styles and icons respectively. The Devise error messages were customised to fit into the bootstrap alert styles.

Users can register using the signup page or via their Google/Github accounts. Users Who have registered can also then sign in via google/github, and the two accounts will be associated together so that they can sign in with either. If on the other hand a user signs in via google/github first, they can not then register via the sign up page - they will be presented with the 'Email already taken' error.

Users who register vis the signup page will be sent a confirmation email, upon fclicking on the link in the email their account will be activated and they can sign in.
