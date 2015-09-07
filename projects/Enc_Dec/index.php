<html>
<body>
<h3>Phrase for BASE 64 Encryption and Decryption is: <strong>"Wasimakram"</strong>.</h3>
<?php
$Pass = "Secret Passphrase";
$Clear = "Wasimakram";

$crypted = fnEncrypt($Clear, $Pass);
echo "<strong>Encrypted:</strong> ".$crypted."</br>";

$newClear = fnDecrypt($crypted, $Pass);
echo "<strong>Decrypted:</strong> ".$newClear."</br>";

function fnEncrypt($sValue, $sSecretKey) {
return rtrim(
        base64_encode(
                mcrypt_encrypt(
                        MCRYPT_RIJNDAEL_256,
                        $sSecretKey, $sValue,
                        MCRYPT_MODE_ECB,
                        mcrypt_create_iv(
                                mcrypt_get_iv_size(
                                        MCRYPT_RIJNDAEL_256,
                                        MCRYPT_MODE_ECB
                                ),
                                MCRYPT_RAND
                        )
                )
        ),"\0"
);
}

function fnDecrypt($sValue, $sSecretKey) {
return rtrim(
        mcrypt_decrypt(
                MCRYPT_RIJNDAEL_256,
                $sSecretKey,
                base64_decode($sValue),
                MCRYPT_MODE_ECB,
                mcrypt_create_iv(
                        mcrypt_get_iv_size(
                                MCRYPT_RIJNDAEL_256,
                                MCRYPT_MODE_ECB
                        ),
                        MCRYPT_RAND
                )
        ),"\0"
);
}
?>
</body>
</html>