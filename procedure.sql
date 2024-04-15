CREATE OR REPLACE FUNCTION GetActiveUsers()
    RETURNS TABLE(id BIGINT, name TEXT)
    AS
    $$
    BEGIN
        RETURN QUERY SELECT users.id, users.name::TEXT FROM users WHERE users.role = '1';
    END;
    $$
    LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS GetActiveUsers();