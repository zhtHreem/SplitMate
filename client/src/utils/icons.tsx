import {
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  LocalGasStation as GasIcon,
  ShoppingCart as ShoppingIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

export const getExpenseIcon = (description: string) => {
  const desc = description.toLowerCase();

  if (desc.includes('dinner') || desc.includes('lunch') || desc.includes('restaurant') || desc.includes('food')) {
    return <RestaurantIcon />;
  }
  if (desc.includes('hotel') || desc.includes('accommodation') || desc.includes('stay')) {
    return <HotelIcon />;
  }
  if (desc.includes('gas') || desc.includes('fuel') || desc.includes('petrol')) {
    return <GasIcon />;
  }
  if (desc.includes('shopping') || desc.includes('groceries')) {
    return <ShoppingIcon />;
  }

  return <ReceiptIcon />;
};
