import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value) => console.log(value);
const SearchBox = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 400,
      }}
    />
  </Space>
);
export { SearchBox };
