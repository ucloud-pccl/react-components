import React from 'react';

import usePopoverConfig, { useShouldUsePopoverConfig } from 'src/hooks/usePopoverConfig';

import Popover, { Animation, Trigger, Placement } from './Popover';

// eslint-disable-next-line react/display-name
const FinalPopover = React.forwardRef((props: any, ref: any) => {
    const shouldUsePopoverConfig = useShouldUsePopoverConfig();
    const popoverConfigProps = usePopoverConfig();
    if (shouldUsePopoverConfig) {
        return <Popover ref={ref} {...popoverConfigProps} {...props} />;
    } else {
        return <Popover ref={ref} {...props} />;
    }
});

Object.assign(FinalPopover, {
    Animation,
    Trigger,
    Placement
});

export default FinalPopover;
