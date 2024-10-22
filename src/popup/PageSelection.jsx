// eslint-disable-next-line no-unused-vars
import { Button, List, ListItem } from '@chakra-ui/react'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { openMyNetworkPage, openSearchPeoplePage } from '../utils/helper'
import { MdPeople, MdSearch } from 'react-icons/md'

const PageSelection = () => {
    return (
        <div>
            <List spacing={3}>
                <ListItem>
                    <Button onClick={() => openMyNetworkPage()} leftIcon={<MdPeople />} width="full">
                        People You May Know
                    </Button>
                </ListItem>
                <ListItem>
                    <Button onClick={() => openSearchPeoplePage()} leftIcon={<MdSearch />} width="full">
                        Search People
                    </Button>
                </ListItem>
            </List>
        </div>
    )
}

export default PageSelection