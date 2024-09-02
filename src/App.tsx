import { MenuOption } from './NestableMenu';
import { MenuButton } from './MenuButton';
import SettingsIcon from '@mui/icons-material/Settings';

const menuOptions: MenuOption[] = [
    {
        label: 'Preferences'
    },
    {
        label: 'Privacy and safety',
        subtext: 'The privacy for your user',
        subMenuOptions: [
            {
                label: 'Personal Data',
                subMenuOptions: [
                    {
                        label: 'Request data usage export',
                        subtext: 'Download a data usage document'
                    },
                    {
                        label: 'User Data'
                    }
                ]
            },
            {
                label: 'Account security'
            },
        ],
    },
    {
        label: 'Cookie settings',
        subtext: 'The cookies for your user',
        action: () => { console.log('cookie settings') }
    },
    {
        label: 'Log Out'
    }
];

export function App() {
    return (
        <>
            <MenuButton
                label="Settings"
                options={ menuOptions }
                buttonProps={ {
                    endIcon: <SettingsIcon />
                } }
            />
        </>
    )
}
