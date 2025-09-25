import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import { useState } from 'react';
import { TextField, Dropdown, IDropdownOption } from '@fluentui/react';

const UserSearch: React.FC<{ context: any }> = ({ context }) => {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState<IDropdownOption[]>([]);

  const handleSearch = async (value: string) => {
    setSearchText(value);

    if (value.length < 2) return; // wait until at least 2 chars typed

    try {
      const client: MSGraphClient = await context.msGraphClientFactory.getClient();
      const response = await client
        .api(`/users?$filter=startswith(displayName,'${value}')`)
        .select("id,displayName,mail,userPrincipalName")
        .top(10)
        .get();

      const users = response.value.map((u: any) => ({
        key: u.id,
        text: `${u.displayName} (${u.mail || u.userPrincipalName})`
      }));

      setOptions(users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TextField
        label="Search User"
        value={searchText}
        onChange={(e, newValue) => handleSearch(newValue || '')}
      />
      <Dropdown
        placeholder="Select a user"
        options={options}
      />
    </div>
  );
};

export default UserSearch;
