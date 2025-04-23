import { View, Text ,Button} from 'react-native'
import React from 'react'
import { AuthProvider, useAuth } from '../../app/context/AuthContext';
import { useTranslation } from 'react-i18next';
const Settings = () => {
  const { t } = useTranslation();
    const { authState, onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={onLogout} title={t('settings.signout')} />
    </View>
  )
}

export default Settings