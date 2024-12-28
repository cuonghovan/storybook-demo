import { useState } from 'react';
import { Fab, Button, Box, Paper, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface ActionMenuProps {
    /** Text to display on the action button (optional) */
    actionButtonText?: string;
    /** Icon to display alongside the action button text (optional) */
    actionButtonIcon?: React.ReactNode;
    /** Array of menu items to display when menu is opened */
    items: React.ReactNode[];
    /** Controls the vertical origin of the menu. Defaults to bottom (optional) */
    originVertical?: 'top' | 'bottom' | 'center';
}

interface AnimationProps {
    open: boolean;
}

interface StyledMenuContainerProps extends AnimationProps {
    originVertical?: 'top' | 'bottom' | 'center';
}

const StyledActionButton = styled(Button)<AnimationProps>(({ open }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    textTransform: 'none',
    fontSize: '0.8rem',
    lineHeight: '1.5rem',
    display: open ? 'none' : 'inline-flex',
    opacity: open ? 0 : 1,
    transitionProperty: 'display, opacity',
    transitionDuration: '0.5s',
    transitionBehavior: 'allow-discrete',
    "@starting-style": {
        opacity: 1,
    },
}));

const StyledCloseButton = styled(Fab)<AnimationProps>(({ theme, open }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '2.5rem',
    height: '2.5rem',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.drawer + 2,
    display: open ? 'inline-flex' : 'none',
    opacity: open ? 1 : 0,
    transitionProperty: 'display, opacity',
    transitionDuration: '0.5s',
    transitionBehavior: 'allow-discrete',
    "@starting-style": {
        opacity: 0,
    },
}));

const StyledMenuContainer = styled(Box)<StyledMenuContainerProps>(({ theme, open, originVertical }) => ({
    position: 'absolute',
    bottom: 0,
    right: '3.5rem',
    flexDirection: 'column',
    display: open ? 'flex' : 'none',
    gap: open ? theme.spacing(1) : 0,
    opacity: open ? 1 : 0,
    transitionProperty: 'display, gap, opacity',
    transitionDuration: '0.5s',
    transitionBehavior: 'allow-discrete',
    zIndex: theme.zIndex.drawer + 2,
    transform: `translateY(${originVertical === 'center' ? 'calc(50% - 1.25rem)' : originVertical === 'top' ? 'calc(100% - 2.5rem)' : '0'})`,
    "@starting-style": {
        gap: 0,
        opacity: 0,
    },
}));

const StyledMenuItem = styled(Paper)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minWidth: '15rem',
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        minWidth: '20rem',
    },
    position: 'relative',
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1
}));

const StyledContainer = styled(Box)(() => ({
    position: 'relative'
}));

export const ActionMenu = (props: ActionMenuProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { actionButtonText, actionButtonIcon, items, originVertical = 'bottom' } = props;

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <StyledContainer>
            <StyledActionButton
                variant="contained"
                size="large"
                startIcon={actionButtonIcon}
                onClick={handleClick}
                open={open}
            >
                {actionButtonText}
            </StyledActionButton>
            <StyledCloseButton
                aria-label="close"
                onClick={handleClose}
                open={open}
            >
                <CloseIcon />
            </StyledCloseButton>
            <StyledMenuContainer open={open} originVertical={originVertical}>
                {items.map((item, index) => (
                    <StyledMenuItem elevation={3} key={index}>
                        {item}
                    </StyledMenuItem>
                ))}
            </StyledMenuContainer>
            <StyledBackdrop open={open} onClick={handleClose} />
        </StyledContainer>
    );
}
