##Ch14 MVC cms blog

REQUIREMENTS/PACKAGES:
- express.js - controllers / api
- express-handlebars - renderer middleware
- express-session - express session management
- connect-session-sequelize - inject session auth / vars into sequelize db queries
- mysql2 - mysql connection
- sequelize - sql model management
- dot-env - env variables
- bcrypt - encrypt / decrypt passwords



PAGES:
( nav: homepage | dashboard | <login|logout> )

- PUBLIC - homepage - blog posts
- PUBLIC - signup (username, password)
- PUBLIC - login (username, password)
- PRIVATE <redirect to login> - dashboard


MODEL:
- User
	_id (auto)
	username: string
	password: string<bcrypt>
	
- Blog
	_id (auto)
	username: string (optional - easy to display username on post headings)
	title: string
	content: string
	
- Comment
	_id (auto)
	post_id: Post<_id>
	content: string

API:
/user
	/signup 	POST: 	(username, password)
	/login  	POST: 	(username, password)
	/logout 	POST: 	()
/post
	/create		POST: 	(title, content) - username will be available thru session vars
	/update		UPDATE: (post_id, title, content)
	/delete		DELETE: (post_id)
	
/comment
	/create		POST:	(post_id, content)
	