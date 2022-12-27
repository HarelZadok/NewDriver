import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal} from "react-native";
import {useEffect, useRef, useState} from "react";
import DatePicker, {getToday} from 'react-native-modern-datepicker';
import {Driver, Passenger} from "../classes/Account";
import {getDatabase, set, ref} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

let id, firstName, lastName, phone, email, password, licenceNumber, licenceIssueDate;



export default function RegisterPage({navigation, route}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(getToday())
    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    const [idDisplay, setIdDisplay] = useState('none')
    const [phoneDisplay, setPhoneDisplay] = useState('none')
    const [licenceDisplay, setLicenceDisplay] = useState('none')
    const [repeatPasswordDisplay, setRepeatPasswordDisplay] = useState('none')

    return <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../resources/CityBG.png')} style={styles.cityImage}/>
            <Image source={require('../resources/Car.png')} style={styles.carImage}/>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
            <Text style={styles.label}>שם</Text>
            <TextInput onChangeText={text => firstName = text} onSubmitEditing={() => refs[0].current.focus()} returnKeyType='next' blurOnSubmit={false} style={styles.input}/>
            <Text style={styles.label}>שם משפחה</Text>
            <TextInput onChangeText={text => lastName = text} ref={refs[0]} onSubmitEditing={() => refs[1].current.focus()} returnKeyType='next' blurOnSubmit={false} style={styles.input}/>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 20, marginBottom: 5}}>
                <Text style={{color: 'red', display: idDisplay, fontSize: 10, marginBottom: 2, marginRight: 3}}> מספר תעודת זהות לא תקני.</Text>
                <Text style={{fontSize: 20}}>ת"ז</Text>
            </View>
            <TextInput maxLength={9} ref={refs[1]} onSubmitEditing={() => refs[2].current.focus()} returnKeyType='next' blurOnSubmit={false} onChangeText={(text) => {handleID(text, setIdDisplay)}} keyboardType='numeric' style={styles.input}/>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 20, marginBottom: 5}}>
                <Text style={{color: 'red', display: phoneDisplay, fontSize: 10, marginBottom: 2, marginRight: 3}}> מספר טלפון לא תקני.</Text>
                <Text style={{fontSize: 20}}>טלפון</Text>
            </View>
            <View style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
                <Text>05</Text>
                <TextInput style={{width: '100%', height: '100%'}} maxLength={8} ref={refs[2]} onSubmitEditing={() => refs[3].current.focus()} returnKeyType='next' blurOnSubmit={false} onChangeText={(text) => {handlePhone(text, setPhoneDisplay)}} keyboardType='numeric'/>
            </View>
            <Text style={styles.label}>אימייל</Text>
            <TextInput onChangeText={text => email = text} ref={refs[3]} onSubmitEditing={() => refs[4].current.focus()} returnKeyType='next' blurOnSubmit={false} style={styles.input}/>
            <Text style={styles.label}>סיסמא</Text>
            <TextInput ref={refs[4]} onChangeText={text => password = text} onSubmitEditing={() => refs[5].current.focus()} returnKeyType='next' blurOnSubmit={false} secureTextEntry style={styles.input}/>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 20, marginBottom: 5}}>
                <Text style={{color: 'red', display: repeatPasswordDisplay, fontSize: 10, marginBottom: 2, marginRight: 3}}> סיסמאות לא תואמות.</Text>
                <Text style={{fontSize: 20}}>אימות סיסמא</Text>
            </View>
            <TextInput ref={refs[5]} onSubmitEditing={() => refs[6].current.focus()} returnKeyType='next' blurOnSubmit={false} onChangeText={(text) => handleRepeatPassword(password, text, setRepeatPasswordDisplay)} secureTextEntry style={styles.input}/>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 20, marginBottom: 5}}>
                <Text style={{color: 'red', display: licenceDisplay, fontSize: 10, marginBottom: 2, marginRight: 3}}> מספר רישיון לא תקני.</Text>
                <Text style={{fontSize: 20}}>מספר רישיון</Text>
            </View>
            <TextInput maxLength={9} ref={refs[6]} keyboardType='numeric' onChangeText={(text) => handleLicenceNumber(text, setLicenceDisplay)} style={styles.input}/>
            <Text style={styles.label}>הנפקת הרישיון</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{backgroundColor: '#eee', padding: 7, borderRadius: 80, color: '#183658', fontWeight: 'bold'}}>{reformatDate(date)}</Text>
                    <Text style={{color: '#183658', fontWeight: 'bold', marginLeft: 10}}>בחרו תאריך</Text>
                </View>
            </TouchableOpacity>
            <Modal animationType="slide"
                   transparent={true}
                   visible={modalVisible}>
                <View style={styles.modal}>
                    <DatePicker mode={'calendar'}
                                options={{
                                    backgroundColor: '#eee',
                                    mainColor: 'black',
                                }}
                                style={{ borderRadius: 6,
                                    width: '100%',}}
                                current={date}
                                selected={date}
                                onDateChange={(date) => {
                                    setDate(date);
                                    licenceIssueDate = reformatDate(date);
                                }}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={{color: '#183658', fontWeight: 'bold'}}>סיום</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity style={styles.button} onPress={() => moveToMainPage(navigation, route.params.type)}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#183658'}}>המשך</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
}

const reformatDate = (date) => {
    let parts = date.split('/');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

const moveToMainPage = async (navigation, type) => {
    let acc;

    if (type === 'drivers')
        acc = new Driver(id, firstName, lastName, phone, email, password, licenceNumber, licenceIssueDate);
    else if (type === 'passengers')
        acc = new Passenger(id, firstName, lastName, phone, email, password, licenceNumber, licenceIssueDate);

    const db = getDatabase();
    set(ref(db, `users/${type}/${id}`), acc).then(() => {
        AsyncStorage.setItem('id', id).then(() => {navigation.navigate('MainPage', {id});});
    }).catch((error) => {alert(error)});
};

const handleLicenceNumber = (text, setDisplay) => {
    licenceNumber = text;
    if (text.length !== 9)
        setDisplay('flex');
    else
        setDisplay('none');
};

const handleID = (text, setDisplay) => {
    id = text;
    if (!verifyIdentityNumber(text))
        setDisplay('flex');
    else
        setDisplay('none');
};

const verifyIdentityNumber = (id) => {
    if ((id.length !== 9) || (isNaN(id))) return false;
    let counter = 0, incNum;
    for (let i = 0; i < 9; i++) {
        incNum = Number(id.charAt(i));
        incNum *= (i % 2) + 1;
        if (incNum > 9) incNum -= 9;
        counter += incNum;
    }
    return (counter % 10 === 0);
}


const handlePhone = (text, setDisplay) => {
    phone = '05' + text;
    if (text.length !== 8)
        setDisplay('flex');
    else
        setDisplay('none');
};

const handleRepeatPassword = (password, repeatPassword, setDisplay) => {
    if (password !== repeatPassword)
        setDisplay('flex');
    else
        setDisplay('none');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: '15%',
    },
    body: {
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    formScrollView: {
        width: '100%',
    },
    carImage: {
        width: 100,
        height: 50,
        transform: [{scaleX: -1}],
        position: 'absolute',
        top: 83,
        left: 25,
        zIndex: 1
    },
    cityImage: {
        position: 'absolute',
        height: 120,
        width: '100%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: -1,
    },
    label: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    input: {
        height: 30,
        width: '100%',
        backgroundColor: '#eee',
        borderRadius: 6,
        padding: 5
    },
    button: {
        alignSelf: 'flex-start',
        marginVertical: 20
    },
    modal: {
        backgroundColor: '#eee',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});