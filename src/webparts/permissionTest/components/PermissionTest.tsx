import * as React from 'react';
import type { IPermissionTestProps } from './IPermissionTestProps';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PermissionKind } from "@pnp/sp/security";
import { useEffect, useState } from 'react';



const PermissionTest:React.FC<IPermissionTestProps>=(props)=>{

  const sp=spfi().using(SPFx(props.context));
  const listTitle = "SPFX Form"; // Change to your list title
  const [permissionText, setPermissionText] = useState<string>('Checking permissions...');


  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const currentUser = await sp.web.currentUser.select('LoginName')();
        console.log(currentUser);
        const perms = await sp.web.lists
          .getByTitle(listTitle)
          .getUserEffectivePermissions(currentUser.LoginName);

        if (sp.web.hasPermissions(perms, PermissionKind.EditListItems)) {
          setPermissionText('You have Edit permission');
        } else if (sp.web.hasPermissions(perms, PermissionKind.ViewListItems)) {
          setPermissionText('You have View permission');
        } else {
          setPermissionText("You don't have permission");
        }
      } catch (error: any) {
        // Handles 404 or any other error
        console.error(error);
        setPermissionText("You don't have permission");
      }
    };

    checkPermissions();
  }, [listTitle]);

  return <div>{permissionText}</div>;
};

export default PermissionTest;