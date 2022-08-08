import { ChangeEvent, FC } from 'react';

interface Props {
  id: string;
  label?: string;
  value: string;
  placeholder: string;
  onInputChange(target: ChangeEvent<HTMLInputElement>): void;
}

export const Search: FC<Props> = ({
  id,
  label,
  value,
  placeholder,
  onInputChange,
}) => {
  return (
    <div>
      <form>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onInputChange}
        />
      </form>
    </div>
  );
};
