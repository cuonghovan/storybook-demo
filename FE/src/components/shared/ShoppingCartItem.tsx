import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ShoppingCartItemProps {
    /** The main text to display for the shopping cart item */
    text: string;
    /** The price of the item (optional) */
    price?: string;
    /** Additional descriptive text about the item (optional) */
    description?: string;
    /** A tag to show special offers/info (optional) */
    tag?: string;
}

const StyledMainContentBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
}));

const StyledItemText = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
}));

const StyledPrice = styled(Box)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
}));

const StyledDescription = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: '0.8rem',
    marginTop: theme.spacing(1),
}));

const StyledTag = styled(Box)(({ theme }) => ({
    fontSize: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: theme.palette.secondary.dark,
    display: 'inline-block',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    borderRadius: theme.spacing(0.25),
    marginTop: theme.spacing(2),
}));

const StyledItemIcon = styled(AddShoppingCartIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
}));

const ShoppingCartItem = (props: ShoppingCartItemProps) => {
    const { text, price, description, tag } = props;
    return (
        <Box>
            <StyledMainContentBox>
                <StyledItemText><StyledItemIcon />{text}</StyledItemText>
                {price && <StyledPrice>{price}</StyledPrice>}
            </StyledMainContentBox>
            {description && <StyledDescription>{description}</StyledDescription>}
            {tag && <StyledTag>{tag}</StyledTag>}
        </Box>
    );
}

export default ShoppingCartItem;
