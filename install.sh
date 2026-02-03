#!/usr/bin/env bash
# install.sh for SlimeVM

cd /home/container || cd /mnt/server || exit 1

echo "Starting SlimeVM setup..."

apt-get update -y && apt-get upgrade -y
apt-get install -y sudo openssh-server curl wget vim nano netcat-traditional iputils-ping

# Root password
ROOT_PASS=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 16 ; echo '')
echo "root:${ROOT_PASS}" | chpasswd

# External IP (approx)
IP=$(curl -s https://api.ipify.org || echo "your-server-ip")

# ssh.txt
cat > ssh.txt << EOF
SlimeVM VPS Access
----------------------------------------
SSH: ssh root@${IP} -p {{server.build.default_port}}
Password: ${ROOT_PASS}

!! IMPORTANT RULES !!
- DDoS / mining / illegal = INSTANT SUSPENSION
- Only legal usage allowed
Support: https://discord.gg/kFNd2EDJNN
EOF

# MOTD
cat > /etc/motd << 'EOF'
Slime VM Official Egg
Made by: dragonxspider
Support: https://discord.gg/kFNd2EDJNN

Welcome to SlimeVM!
Resources as per panel allocation.
Illegal activities strictly prohibited.
EOF

# SSH config
sed -i 's|#PermitRootLogin prohibit-password|PermitRootLogin yes|' /etc/ssh/sshd_config
echo "Port {{server.build.default_port}}" >> /etc/ssh/sshd_config
sed -i 's|#PasswordAuthentication yes|PasswordAuthentication yes|' /etc/ssh/sshd_config

echo "Setup done! SSH details saved in ssh.txt"

# Start SSH foreground
exec /usr/sbin/sshd -D -e
