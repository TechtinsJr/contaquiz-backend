module.exports = (sequelize, DataTypes) => {
    const UsuarioTrilha = sequelize.define('UsuarioTrilha', {}, { timestamps: false });

    return UsuarioTrilha;
};