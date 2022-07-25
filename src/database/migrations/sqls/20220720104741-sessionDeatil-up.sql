/* Replace with your SQL commands */
CREATE TABLE sessionDetail
(
    session_id serial PRIMARY KEY,
    userid    int REFERENCES users (userid),
    startTime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    endTime   TIMESTAMP
);