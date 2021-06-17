/**
 * Stored function for updating tables having column updated_at.
 * Supposed to be invoked by a trigger only.
 */
exports.functionUp = `
 create or replace function updated_at_auto()
 returns trigger as $$
 begin
     new.updated_at = current_timestamp;
     return new;
 end;
 $$ language 'plpgsql';
`

exports.functionDown = `
 drop function if exists updated_at_auto;
`

// Set trigger on any table to use the above function.
exports.triggerUp = function triggerUp(table) {
  return `drop trigger if exists updated_at_auto on ${table}; create trigger updated_at_auto before update on ${table} for each row execute procedure updated_at_auto();`
}
