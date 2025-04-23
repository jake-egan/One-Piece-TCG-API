import { View, Text ,Button} from 'react-native'
import React from 'react'
import { AuthProvider, useAuth } from '../../app/context/AuthContext';

const Settings = () => {
    const { authState, onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={onLogout} title="Sign Out" />
    </View>
  )
}

export default Settings