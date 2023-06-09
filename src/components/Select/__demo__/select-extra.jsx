import React from 'react';
import Select from 'src/components/Select';
import Button from 'src/components/Button';

// demo start
const { Option, Extra } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                        onChange={console.log}
                    >
                        <Option value={1}>1</Option>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={[1, 2, 3].map(v => ({ value: v, label: v + '' }))}
                        extra={hide => {
                            return (
                                <div>
                                    <Button onClick={() => console.log(123)}>xxx</Button>
                                    <Button onClick={hide}>hide</Button>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
