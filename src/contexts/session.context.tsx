/* eslint-disable react-refresh/only-export-components */
// oturum yönetimi yapacağımız context dosyası

import React from 'react';

export type SessionState = {
	isAuthenticated: boolean;
	userName: string | null;
	roles: string; // admin,user,manager
};
// session context'in tip tanımlamaları ve yapılacak işlemler
export type SessionContextType = {
	session: SessionState; // mevcut oturum durumu
	signIn: (userName: string, roles: string) => void; // oturum açma fonksiyonu
	signOut: () => void; // oturum kapatma fonksiyonu
};

// varsayılan oturum durumu
const defaultSessionState: SessionState = {
	isAuthenticated: false,
	userName: null,
	roles: '',
};

// session context için varsayılan değerler
export const sessionContextDefaultValue: SessionContextType = {
	session: defaultSessionState,
	signIn: () => {},
	signOut: () => {},
};

// session State bilgilerini tutacak olan context
// Reactda context yönetimini için kullanılır, Güncel değerleri sağlayıp tüketmek için
export const SessionContext = React.createContext<SessionContextType>(
	sessionContextDefaultValue
);

SessionContext.displayName = 'SessionContext';

// session context provider bileşeni
// tüm uygulama genelinde oturum bilgilerini yönetmek ve sağlamak için provider bileşeninden yararlanırız.
export const SessionContextProvider: React.FC<
	React.PropsWithChildren<{ children: React.ReactNode }>
> = ({ children }) => {
	const [session, setSession] =
		React.useState<SessionState>(defaultSessionState);

	const signIn = (userName: string, roles: string) => {
        console.log("Signing in:", userName, roles);
		setSession({ isAuthenticated: true, userName, roles });
	};

	const signOut = () => {
        console.log("Signing out");
		setSession(defaultSessionState);
	};

	return (
		<SessionContext.Provider value={{ session, signIn, signOut }}>
			{children}
		</SessionContext.Provider>
	);
};

// Global State yöntemi ile Context Oluşturma Adımları:
// 1.State tanımı
// 2.Context tanımı
// 3.Provider bileşeni tanımı