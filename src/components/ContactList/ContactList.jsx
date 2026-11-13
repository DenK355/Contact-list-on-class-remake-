
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Chip
} from '@mui/material';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';

function ContactList(props) {
  const {
      contacts,
      onSelect,
      onRemove,
      selectedContact
  } = props;

  return (
      <Paper
          elevation={2}
          sx={{
              p: 3,
              borderRadius: 3,
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box'
          }}
      >
          <Box
              sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  gap: 2
              }}
          >
              <Box
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                  }}
              >
                  <ContactsIcon color="primary" />

                  <Typography
                      variant="h5"
                      sx={{
                          fontWeight: 600
                      }}
                  >
                      Контакты
                  </Typography>
              </Box>

              <Chip
                  label={contacts.length}
                  color="primary"
                  variant="outlined"
                  size="small"
              />
          </Box>

          {contacts.length === 0 ? (
              <Box
                  sx={{
                      py: 6,
                      textAlign: 'center'
                  }}
              >
                  <ContactsIcon
                      sx={{
                          fontSize: 48,
                          color: 'text.disabled',
                          mb: 2
                      }}
                  />

                  <Typography
                      sx={{
                          color: 'text.secondary'
                      }}
                  >
                      Список контактов пуст
                  </Typography>

                  <Typography
                      variant="body2"
                      sx={{
                          color: 'text.disabled'
                      }}
                  >
                      Добавьте свой первый контакт
                  </Typography>
              </Box>
          ) : (
              <List
                  disablePadding
                  sx={{
                      maxHeight: 550,
                      overflowY: 'auto'
                  }}
              >
                  {contacts.map((contact) => {
                      const fullName = [
                          contact.firstName,
                          contact.lastName
                      ]
                          .filter(Boolean)
                          .join(' ') || 'Без имени';

                      const initials = [
                          contact.firstName?.[0],
                          contact.lastName?.[0]
                      ]
                          .filter(Boolean)
                          .join('')
                          .toUpperCase() || '?';

                      const isSelected =
                          selectedContact?.id === contact.id;

                      return (
                          <ListItem
                              key={contact.id}
                              disablePadding
                              sx={{
                                  mb: 1
                              }}
                              secondaryAction={
                                  <Tooltip title="Удалить контакт">
                                      <IconButton
                                          edge="end"
                                          color="error"
                                          aria-label={`Удалить ${fullName}`}
                                          onClick={() => {
                                              onRemove(contact.id);
                                          }}
                                      >
                                          <DeleteOutlinedIcon />
                                      </IconButton>
                                  </Tooltip>
                              }
                          >
                              <ListItemButton
                                  selected={isSelected}
                                  onClick={() => {
                                      onSelect(contact.id);
                                  }}
                                  sx={{
                                      borderRadius: 2,
                                      pr: 7,
                                      '&.Mui-selected': {
                                          bgcolor: 'action.selected'
                                      },
                                      '&.Mui-selected:hover': {
                                          bgcolor: 'action.selected'
                                      },
                                      '&:hover': {
                                          bgcolor: 'action.hover'
                                      }
                                  }}
                              >
                                  <ListItemAvatar>
                                      <Avatar
                                          sx={{
                                              bgcolor: isSelected
                                                  ? 'primary.main'
                                                  : 'secondary.main'
                                          }}
                                      >
                                          {initials}
                                      </Avatar>
                                  </ListItemAvatar>

                                  <ListItemText
                                      primary={fullName}
                                      secondary={
                                          [
                                              contact.email,
                                              contact.phone
                                          ]
                                              .filter(Boolean)
                                              .join(' · ') ||
                                          'Нет контактных данных'
                                      }
                                      slotProps={{
                                          primary: {
                                              noWrap: true,
                                              sx: {
                                                  fontWeight: 600
                                              }
                                          },
                                          secondary: {
                                              noWrap: true
                                          }
                                      }}
                                  />
                              </ListItemButton>
                          </ListItem>
                      );
                  })}
              </List>
          )}
      </Paper>
  );
}

export default ContactList;
