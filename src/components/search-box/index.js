import { Input, Space } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

const onSearch = (value) => console.log(value);
const SearchBox = ({ width }) => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: width,
      }}
    />
  </Space>
);

SearchBox.propTypes = {
  width: PropTypes.any,
};
export { SearchBox };
