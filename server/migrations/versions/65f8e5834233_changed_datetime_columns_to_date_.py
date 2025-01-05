"""changed DateTime columns to Date columns to remove time

Revision ID: 65f8e5834233
Revises: 42b569604ecb
Create Date: 2025-01-05 02:36:13.166565

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65f8e5834233'
down_revision = '42b569604ecb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('animals', schema=None) as batch_op:
        batch_op.alter_column('DOB',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=True)

    with op.batch_alter_table('visits', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('visits', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=True)

    with op.batch_alter_table('animals', schema=None) as batch_op:
        batch_op.alter_column('DOB',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=True)

    # ### end Alembic commands ###
