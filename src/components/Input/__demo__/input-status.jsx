import React from 'react';

import Input from 'src/components/Input';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input />
                </div>
                <div className="demo-wrap">
                    <Input status="error" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
