/* Replace with your SQL commands */
CREATE TABLE todo ( id serial PRIMARY KEY, userid int REFERENCES users(userid), username varchar(50), task_description varchar(50),status boolean default false, deadline date not null, priority varchar(10), deleted boolean default false);