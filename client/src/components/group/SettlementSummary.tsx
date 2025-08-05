import React from 'react';
import { Card, CardContent, Typography, Box, Alert, List, ListItem, ListItemText, Chip, Divider} from '@mui/material';
import { AccountBalance as BalanceIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import type { SettlementSummaryProps} from '../../types/settlement';
import { PriceChangeOutlined } from '@mui/icons-material';
import { calculateMemberBalances,  getBalanceText, } from '../../utils/settlements';

const SettlementSummary: React.FC<SettlementSummaryProps> = ({  members,settlements,getMemberName }) => {

  const memberBalances = calculateMemberBalances(members, settlements);

  
  return (
    <Box>
      <Card elevation={8} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <BalanceIcon />
            Individual Balances
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={1}>
            {memberBalances.map(member => (
              <Chip
                key={member.id} label={`${member.name}: ${getBalanceText(member.balance)}`}  color={member.balance > 0.01 ? 'success' : member.balance < -0.01 ? 'error' : 'default'}  variant="outlined" />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card elevation={8}>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TrendingUpIcon />
            Settlement Instructions ({settlements.length})
          </Typography>
          
          {settlements.length === 0 ? (
            <Alert severity="success">
              🎉 Everyone is settled up! No payments needed.
            </Alert>
          ) : (
            <List>
              {settlements.map((settlement, index) => (
                <React.Fragment key={`${settlement.from}-${settlement.to}`}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body1">
                            <strong>{getMemberName(settlement.from)}</strong> pays{' '}
                            <strong>{getMemberName(settlement.to)}</strong>
                          </Typography>
                          <Typography variant="h6" color="success.main">
                            <PriceChangeOutlined/> {settlement.amount.toFixed(2)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Settlement #{index + 1}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < settlements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettlementSummary;