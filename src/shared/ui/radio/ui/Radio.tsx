export const Radio = ({ checked, name, value, onChange }) => {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
};
