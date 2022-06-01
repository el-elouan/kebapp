import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import call from 'react-native-phone-call';
import {Linking} from 'react-native'

export default class PhonePad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "3375353979",
        }
    }
    
    // Appelle au numéro récupéré avec la fonction "onPhoneInputChange" en utilisant le module "react-native-phone-call".
    calling() {
        let args = {
            number:  this.state.phoneNumber,
            prompt: false,
            skipCanOpen: true
        }
        
        if(args.number.length >= 10) {
            call(args).catch(console.error);
        } else {
            console.log("Erreur ! Numéro incorrect");
        }
    }

    // Sert à récupérer le numéro de téléphone tapé par l'utilisateur.
    onPhoneInputChange = (value) => {
        this.state.phoneNumber = value;
        this.setState({phoneNumber: this.state.phoneNumber});
    }

    render() {
        return (
            <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={{ flex: 1, justifyContent:"center" }}>
                    {/* Utilise le module "react-native-phone-input" pour afficher la pad pour tapez le numéros. */}
                    <PhoneInput
                        style={styles.inputPhoneNum}
                        ref={(ref) => { this.phone = ref; }}
                        textProps={{
                            placeholder: 'Entrez un numéro de téléphone...'
                        }}
                        initialCountry={'fr'}
                        initialValue={this.state.phoneNumber}
                        onChangePhoneNumber={this.onPhoneInputChange} 
                    />
                </View>

                <View style={{ flex: 1, justifyContent:"center" }}>
                    {/* Apelle la fonction d'apelle "calling()". */}
                    <Pressable style={styles.btnCalling} onPress={() => { this.calling(); }}>
                        <Text style={styles.textCalling}>Appeler</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

// Styles
const styles = StyleSheet.create({
    btnCalling: {
        backgroundColor: "#453025",
        borderRadius: 10,
        padding: 20
    },
    textCalling: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 2,
        fontSize: 18
    },
    inputPhoneNum: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 6
    }
});