import { HelpOutline } from '@mui/icons-material';
import { IconButton, ListItemButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useLang } from '@hyperobjekt/react-dashboard';

const HintIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.2),
  left: theme.spacing(1.25),
  opacity: 0,
  transition: theme.transitions.create('opacity'),
  '& .MuiSvgIcon-root': {
    fontSize: theme.typography.pxToRem(16),
  },
}));

/**
 * Custom list item that has a tooltip hint for metrics with a `DESC_` entry
 * in the language dictionary.  Used in the indicator panel metrics list.
 */
const ListItemHintButton = ({ value, children, itemProps, ...props }) => {
  const langKey = `DESC_${value}`.toUpperCase();
  const hint = useLang(langKey);
  return (
    <ListItemButton {...props}>
      {(hint || itemProps?.source) && (
        <Tooltip
          title={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {hint && <div>{hint}</div>}
              {itemProps?.source && (
                <div
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  Source: {itemProps?.source}
                </div>
              )}
            </div>
          }
          arrow
          placement="left"
        >
          <HintIconButton className="SpiHintIconButton-root" size="small">
            <HelpOutline />
          </HintIconButton>
        </Tooltip>
      )}
      {children}
    </ListItemButton>
  );
};

export default ListItemHintButton;
