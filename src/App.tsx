import { MenuOption } from './Menu';
import { MenuButton } from './MenuButton';
import SettingsIcon from '@mui/icons-material/Settings';

const menuOptions: MenuOption[] = [
    { label: 'Preferences' },
    {
        label: 'Privacy and safety',
        subMenuOptions: [
            {
                label: 'Personal Data',
                subMenuOptions: [
                    { label: 'Cookies' },
                    { label: 'User Data' }
                ]
            },
            { label: 'Account security' },
        ],
    },
    { label: 'Cookie settings' },
    { label: 'Log Out' }
];

function App() {
    return (
        <>
            <MenuButton
                label="Settings"
                options={ menuOptions }
                buttonProps={{
                    endIcon: <SettingsIcon />
                }}
            />
        </>
    )
}

export default App
