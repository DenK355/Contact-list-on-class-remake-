
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    Box
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Введите корректный Email')
        .required('Email обязателен'),

    phone: Yup.string()
        .required('Номер телефона обязателен')
        .matches(
            /^\+?[0-9\s()-]+$/,
            'Недопустимые символы в номере'
        )
        .test(
            'phone-length',
            'Номер должен содержать от 7 до 15 цифр',
            (value) => {
                if (!value) return false;

                const digits = value.replace(/\D/g, '');

                return digits.length >= 7 && digits.length <= 15;
            }
        )
});

const fields = [
    { name: 'firstName', label: 'Имя' },
    { name: 'lastName', label: 'Фамилия' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Телефон' }
];

function ContactForm(props) {
    const formik = useFormik({
        initialValues: props.selectedContact
            ? {
                firstName: props.selectedContact.firstName ?? '',
                lastName: props.selectedContact.lastName ?? '',
                email: props.selectedContact.email ?? '',
                phone: props.selectedContact.phone ?? ''
            }
            : { ...emptyForm },

        validationSchema,
        validateOnMount: true,

        onSubmit: async (values, { resetForm }) => {
            const isCreating = !props.selectedContact;

            try {
                await props.onSave(values);

                if (isCreating) {
                    resetForm({ values: { ...emptyForm } });
                }
            } catch (error) {
                console.error(
                    'Не удалось сохранить контакт:',
                    error
                );
            }
        }
    });

    const clearField = (event) => {
        const field = event.currentTarget.name;

        formik.setFieldValue(field, '');
    };

    const handleNew = () => {
        props.onNew();
        formik.resetForm({
            values: { ...emptyForm }
        });
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 3,
                width: '100%',
                maxWidth: 500,
                boxSizing: 'border-box'
            }}
        >
            <Typography
                variant="h5"
                fontWeight={600}
                sx={{ mb: 1 }}
            >
                {props.selectedContact
                    ? 'Редактирование контакта'
                    : 'Новый контакт'}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Заполните данные контакта
            </Typography>

            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
            >
                <Stack spacing={2.5}>
                    {fields.map(({ name, label }) => (
                        <TextField
                            key={name}
                            fullWidth
                            name={name}
                            label={label}
                            type={
                                name === 'email'
                                    ? 'email'
                                    : name === 'phone'
                                      ? 'tel'
                                      : 'text'
                            }
                            value={formik.values[name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched[name] &&
                                formik.errors[name]
                            )}
                            helperText={
                                formik.touched[name] &&
                                formik.errors[name]
                                    ? formik.errors[name]
                                    : name === 'phone'
                                      ? 'От 7 до 15 цифр'
                                      : ' '
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                name={name}
                                                onClick={clearField}
                                                edge="end"
                                                size="small"
                                                aria-label={`Очистить ${label}`}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    ))}

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1.5,
                            flexWrap: 'wrap',
                            pt: 1
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={
                                !formik.isValid ||
                                formik.isSubmitting
                            }
                        >
                            Save
                        </Button>

                        <Button
                            type="button"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleNew}
                        >
                            New
                        </Button>

                        {props.selectedContact && (
                            <Button
                                type="button"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={props.onDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
}

export default ContactForm;
