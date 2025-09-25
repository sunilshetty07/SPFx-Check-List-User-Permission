# SPFx Check List User Permission

This SharePoint Framework (SPFx) solution contains **two React-based web parts**:

---

## 1. Permission Web Part
- Checks the current user's permissions on a specified SharePoint list.
- Displays whether the user has **Edit**, **View**, or **No Access** rights.
- Helps administrators quickly verify access levels without navigating list settings.

---

## 2. User Management Web Part
- Fetches SharePoint current user details and external user data via APIs.
- Provides a **searchable combo box** to find and select users.
- Displays API user data in a dynamic table showing fields like name, email, phone, and company.

---

## Features
- Easy integration with SharePoint Online pages.
- Combines **PnPjs**, **SPFx HttpClient**, and **React** for seamless data fetching and UI.
- Modular design allows reuse of search and table components.

---

## Technologies Used
- **SPFx (SharePoint Framework)**
- **React & TypeScript**
- **PnPjs**
- **Fluent UI** for combo box and table
- **SPFx HttpClient** for API calls

---

## Prerequisites
- SharePoint Online tenant
- Appropriate permissions to access the SharePoint list

---

## Installation
1. Clone this repository:
git clone https://github.com/sunilshetty07/SPFx-Check-List-User-Permission.git

2. Navigate to the project directory:
cd SPFx-Check-List-User-Permission

3. Install dependencies:
npm install

4. Deploy the web parts to your SharePoint Online environment.
---
Usage
- Add the web part to a SharePoint page.
- For the Permission Web Part: Configure the list URL in the web part properties.
- For the User Management Web Part: Use the combo box to search and select users; view user details in the table