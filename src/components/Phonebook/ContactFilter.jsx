export const ContactFilter = ({ value, onChange }) => {
  return (
    <div>
      <h2>Find contacts by name</h2>
      <input
        type="text"
        value={value}
        onChange={evt => onChange(evt.target.value)}
      ></input>
    </div>
  );
};
