### Controlled vs Uncontrolled Components in React

#### Controlled Components

A controlled component is an input element whose value is controlled by React state. The component's state is the single source of truth, and any changes to the input value are handled by updating the state.

**Characteristics:**

- The input value is managed by React state.
- Changes are handled through event handlers.
- More predictable and easier to debug since the state always reflects the input's current value.

**Example:**

```javascript
const [value, setValue] = useState('');

return (
  <input
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
);
```

#### Uncontrolled Components

An uncontrolled component is an input element that maintains its own internal state. The value is accessed using a `ref` to get the current value directly from the DOM.

**Characteristics:**

- The input value is managed by the DOM.
- Changes are not directly managed by React state.
- Useful for simple forms where direct DOM access is sufficient.

**Example:**

```javascript
const inputRef = useRef(null);

const handleSubmit = () => {
  alert(inputRef.current.value);
};

return (
  <form onSubmit={handleSubmit}>
    <input type="text" ref={inputRef} />
    <button type="submit">Submit</button>
  </form>
);
```

### Key Differences

- **State Management**: Controlled components use React state to manage input values, whereas uncontrolled components rely on the DOM.
- **Event Handling**: Controlled components handle changes through event handlers that update state, while uncontrolled components typically use `refs` to access the input values.
- **Predictability**: Controlled components offer better control and predictability over the form data, making them easier to debug and test.

Controlled components are generally preferred in React applications for their consistency and ease of state management, especially in complex forms.
