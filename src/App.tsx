import { NestableMenuProps } from './NestableMenu';
import { NestableMenuButton } from './NestableMenuButton';
import SettingsIcon from '@mui/icons-material/Settings';

const groups: NestableMenuProps[ 'groups' ] = [
    [
        {
            label: 'Preferences'
        }
    ],
    [
        {
            label: 'Privacy and safety',
            subtext: 'The privacy for your user',
            subMenuGroups: [
                [
                    {
                        label: 'Personal Data',
                        subMenuGroups: [
                            [
                                {
                                    label: 'Request data usage export',
                                    subtext: 'Download a data usage document'
                                },
                                {
                                    label: 'User Data'
                                }
                            ]
                        ]
                    },
                    {
                        label: 'Other Data'
                    }
                ],
                [
                    {
                        label: 'Account Security'
                    }
                ]
            ],
        },
        {
            label: 'Cookie settings',
            subtext: 'The cookies for your user',
            action: () => { console.log('cookie settings') }
        },

    ],
    [
        {
            label: 'Log Out'
        }
    ]
];

export function App() {
    return (
        <>
            <NestableMenuButton
                label="Settings"
                groups={ groups }
                buttonProps={ {
                    endIcon: <SettingsIcon />
                } }
            />
        </>
    )
}
