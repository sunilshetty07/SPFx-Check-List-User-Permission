import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import { useState } from 'react';

const UserSearchCombo: React.FC<{ context: any }> = ({ context }) => {
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  const [selectedUser, setSelectedUser] = useState<IComboBoxOption | null>(null);

  const handleSearch = async (value: string) => {
    if (!value || value.length < 2) return; // search only after 2+ chars

    try {
      const client: MSGraphClient = await context.msGraphClientFactory.getClient();
      const response = await client
        .api(`/users?$filter=startswith(displayName,'${value}')`)
        .select("id,displayName,mail,userPrincipalName")
        .top(10)
        .get();

      const users: IComboBoxOption[] = response.value.map((u: any) => ({
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
      <ComboBox
        allowFreeform
        autoComplete="on"
        placeholder="Search and select user"
        options={options}
        onChange={(event, option) => {
          if (option) {
            setSelectedUser(option);
          }
        }}
        onPendingValueChanged={(option, index, value) => {
          // Called when user types
          if (value) {
            handleSearch(value);
          }
        }}
      />

      {selectedUser && (
        <div style={{ marginTop: '10px' }}>
          <strong>Selected:</strong> {selectedUser.text}
        </div>
      )}
    </div>
  );
};

export default UserSearchCombo;
