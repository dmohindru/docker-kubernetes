# Setting Up a Local Root CA and Self-Signed Certificates for Local Network Development

This guide provides step-by-step instructions to set up a local root Certificate Authority (CA) and issue self-signed certificates for local network development.

---

## Step 1: Set Up a Local Root CA

1. **Create a Root Private Key**:

   - Generate a private key for your root CA. This key will be used to sign certificates.

   ```shell
   openssl genrsa -des3 -out rootCA.key 2048
   ```

2. **Generate a Root Certificate**:

   - Create a self-signed certificate for your root CA using the private key.
   - This certificate will act as the "trusted root" in your network.

   ```shell
   openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 3650 -out rootCA.crt

   ```

---

## Step 2: Install the Root Certificate

1. **Add the Root Certificate to Trusted Stores**:

   - Install the root CA certificate on all devices that will access the local network:
     - **Linux**: Add to `/usr/local/share/ca-certificates/` and update with `update-ca-certificates`.
     - **Windows**: Use the Certificate Manager (`certmgr.msc`) to import into "Trusted Root Certification Authorities."
     - **macOS**: Use the Keychain Access app to add it to the "System" keychain.
     - **Browsers (Optional)**: Some browsers, like Firefox, may require manual configuration.
     ```shell
     sudo cp rootCA.crt /usr/local/share/ca-certificates/
     sudo update-ca-certificates
     ```

2. **Verify the Installation**:

   - Test by viewing the certificate in the trusted authorities list on the devices.

   ```shell
   openssl x509 -in /usr/local/share/ca-certificates/rootCA.crt -text -noout
   ```

---

## Step 3: Create a Certificate for Your Local Domain

1. **Generate a Private Key for the Domain**:

   - Create a private key specific to your domain (e.g., `mycooldomain.key`).

   ```shell
   openssl genrsa -out k3s-cluster1.local.key 2048
   ```

2. **Create a Certificate Signing Request (CSR)**:

   - Generate a CSR for your domain, specifying details like the common name (e.g., `mycooldomain`).

   ```shell
   openssl req -new -key k3s-cluster1.local.key -out k3s-cluster1.local.csr
   ```

3. **Sign the Certificate with Your Root CA**:
   - Use your root CA’s private key to sign the CSR and issue a certificate (e.g., `mycooldomain.crt`).
   ```shell
   openssl x509 -req -in k3s-cluster1.local.csr -CA dmohindruCA.crt -CAkey dmohindruCA.key -CAcreateserial -out k3s-cluster1.local.crt -days 365 -sha256 -extfile k3s-cluster1.local.ext
   ```
4. **Verify the Generated Certificate**:

   ```shell
   openssl x509 -in k3s-cluster1.local.crt -text -noout
   ```

5. **Verify if Generated Certificate passes chain of trust**:

   ```shell
   openssl verify -CAfile <root-ca-file> <certificate-file>

   ```

6. **Openssl config file format**

   ```openssl config
   authorityKeyIdentifier=keyid,issuer
   basicConstraints=CA:FALSE
   keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
   subjectAltName = @alt_names

   [alt_names]
   DNS.1 = \*.cluster2
   DNS.2 = cluster2

   ```

---

## Step 4: Configure the Web Server

1. **Install the Certificate and Key**:

- Place the domain certificate (`mycooldomain.crt`) and private key (`mycooldomain.key`) in a secure directory on your server.

```shell
sudo cp yourdomain.crt /etc/ssl/mydomain/
sudo cp yourdomain.key /etc/ssl/mydomain/
```

2. **Update the Web Server Configuration**:

   ```shell
   sudo nano /etc/apache2/sites-available/yourdomain.conf
   ```

   - For **Apache**:
     ```apache
     <VirtualHost *:443>
         ServerName mycooldomain
         SSLEngine on
         SSLCertificateFile /path/to/mycooldomain.crt
         SSLCertificateKeyFile /path/to/mycooldomain.key
     </VirtualHost>
     ```

3. **Disable the non-SSL site and enable the SSL site:**:

   ```shell
   sudo a2dissite 000-default.conf
   sudo a2ensite yourdomain.conf
   ```

4. **Restart the Server**:
   - Reload or restart the server to apply the changes.
   ```shell
   sudo systemctl restart apache2
   ```

---

## Step 5: Update `/etc/hosts` for Name Resolution

1. **Map the Domain to the Local IP**:
   - Add an entry in `/etc/hosts` on all devices:
     ```
     192.168.1.10   mycooldomain
     ```
   - Replace `192.168.1.10` with the actual IP of your server.

---

## Step 6: Test the Setup

1. **Access the Site in a Browser**:

   - Open `https://mycooldomain` in a browser on a device with the root CA installed.

2. **Verify the Certificate**:
   - Check the certificate in the browser to ensure it’s issued by your root CA and trusted.

---

## Step 7: Maintain and Reuse the Setup

1. **Renew Certificates as Needed**:

   - Certificates have an expiration date. Renew and re-sign domain certificates before they expire.

2. **Backup the Root CA Files**:
   - Safeguard your root CA private key and certificate for future use.

---

## Tools and Commands

- **OpenSSL**: For generating keys, CSRs, and certificates.
- **Web Server Configurations**: Apache or Nginx.
- **Certificate Installation**: OS or browser-specific tools.

---

### Notes:

- Ensure your root CA private key is securely stored and not accessible to unauthorized users.
- Use tools like `mkcert` for simpler setups if manual configurations seem too complex.
- Always test your setup in a secure, isolated environment before rolling it out across devices.

### Links

- **[Nice tutorial on setting up rootCA locally](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)**
